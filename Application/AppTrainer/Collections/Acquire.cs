using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Collections.Others;
using Application.AppTrainer.Util;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections
{
    public class Acquire
    {
        public class EtudeEnvelope
        {
            public List<EtudeCollectionDto> Etudes { get; set; }
        }

        public class Query : IRequest<EtudeEnvelope>
        {
            public Query()
            {
                // FILTERS GO HERE
            }
        }

        public class Handler : IRequestHandler<Query, EtudeEnvelope>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ITomePosition _tomePosition;

            public Handler(DataContext context, IUserAccessor userAccessor, ITomePosition tomePosition)
            {
                _tomePosition = tomePosition;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<EtudeEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Etudes
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var etudes = queryable.ToList();
                var etudesToReturn = new List<EtudeCollectionDto>();

                foreach (var etude in etudes)
                {
                    var userEtude = new EtudeCollectionDto
                    {
                        Id = etude.Id,
                        Title = etude.Title,
                        Active = etude.Active,
                        Fluence = etude.Fluence,
                        Tome = etude.Tome,
                        TomePosition = await _tomePosition.GetTomePosition(etude.Tome),
                        Time = etude.Time,
                        Description = etude.Description,
                        Executions = etude.Executions,
                        Played = etude.Played,
                        Created = etude.Created,
                        LastPlayed = etude.LastPlayed
                    };
                    etudesToReturn.Add(userEtude);
                }

                List<EtudeCollectionDto> sortedetudesToReturn = etudesToReturn.OrderBy(x => x.TomePosition).ToList();

                return new EtudeEnvelope
                {
                    Etudes = sortedetudesToReturn
                };
            }
        }
    }
}