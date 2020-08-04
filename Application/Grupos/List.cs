using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Grupos
{
    public class List
    {
        public class GruposEnvelope
        {
            public List<GrupoDto> Grupos { get; set; }
        }

        public class Query : IRequest<GruposEnvelope>
        {
            public Query()
            {

            }
        }

        public class Handler : IRequestHandler<Query, GruposEnvelope>
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

            public async Task<GruposEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Grupos
                    .Where(x => x.AppUserId == user.Id)
                    //.Where(x => x.Label == "Tools")
                    .OrderBy(x => x.Titulo)
                    .AsQueryable();

                var grupos = await queryable
                    .ToListAsync();

                return new GruposEnvelope
                {
                    Grupos = _mapper.Map<List<Grupo>, List<GrupoDto>>(grupos)
                };
            }
        }

    }
}