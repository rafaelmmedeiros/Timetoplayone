using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Lores.Others;
using Application.AppTrainer.Util;
using Application.Interfaces;
using AutoMapper;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Lores
{
    public class Acquire
    {
        public class TomeEnvelope
        {
            public List<TomeLoresDto> Tomes { get; set; }
        }

        public class Query : IRequest<TomeEnvelope>
        {
            public Query()
            {
                // FILTERS GO HERE
            }
        }

        public class Handler : IRequestHandler<Query, TomeEnvelope>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ITomeTotalEtudes _tomeTotalEtudes;
            private readonly ITomeTotalTIme _tomeTotalTIme;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, ITomeTotalEtudes tomeTotalEtudes, ITomeTotalTIme tomeTotalTIme)
            {
                _tomeTotalTIme = tomeTotalTIme;
                _tomeTotalEtudes = tomeTotalEtudes;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<TomeEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Tomes
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var tomes = queryable.ToList();
                var tomesToProcessing = new List<TomeLoresDto>();

                foreach (var tome in tomes)
                {
                    var userTome = new TomeLoresDto
                    {
                        Id = tome.Id,
                        Title = tome.Title,
                        Active = tome.Active,
                        Position = tome.Position,
                        TotalEtudes = await _tomeTotalEtudes.GetTomeQuantity(tome.Title),
                        TotalTime = await _tomeTotalTIme.GetTomeTime(tome.Title),
                    };
                    tomesToProcessing.Add(userTome);
                }

                List<TomeLoresDto> sortedTomesToReturn = tomesToProcessing.OrderBy(x => x.Position).ToList();

                return new TomeEnvelope
                {
                    Tomes = sortedTomesToReturn
                };
            }
        }

    }
}