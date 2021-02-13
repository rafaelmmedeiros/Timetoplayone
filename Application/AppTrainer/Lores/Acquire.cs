using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Lores.Others;
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
            public List<TomeListDto> Tomes { get; set; }
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
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<TomeEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Tomes
                    .Where(a => a.AppUserId == user.Id)
                    .OrderBy(b => b.Position)
                    .AsQueryable();

                var tomes = await queryable
                    .ToListAsync();

                return new TomeEnvelope
                {
                    Tomes = _mapper.Map<List<Tome>, List<TomeListDto>>(tomes)
                };
            }
        }

    }
}