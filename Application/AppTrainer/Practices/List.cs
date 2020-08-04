using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Practices.Others;
using Application.Interfaces;
using AutoMapper;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Practices
{
    public class List
    {
        public class PracticeEnvelope
        {
            public List<EtudeListDto> Etudes { get; set; }
        }


        public class Query : IRequest<PracticeEnvelope>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, PracticeEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<PracticeEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Etudes
                    .Where(x => x.AppUserId == user.Id)
                    .Where(x => x.Active == true)
                    //.OrderBy(x => x.Time)
                    //.OrderByDescending(x => x.Title)
                    .AsQueryable();

                var etudes = await queryable
                    .ToListAsync();

                return new PracticeEnvelope
                {
                    Etudes = _mapper.Map<List<Etude>, List<EtudeListDto>>(etudes)
                };
            }
        }

    }
}