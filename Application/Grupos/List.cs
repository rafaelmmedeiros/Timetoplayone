using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Grupos
{
    public class List
    {
        public class Query : IRequest<List<GrupoDto>> { }

        public class Handler : IRequestHandler<Query, List<GrupoDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<GrupoDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grupos = await _context.Grupos.ToListAsync();

                return _mapper.Map<List<Grupo>, List<GrupoDto>>(grupos);
            }
        }

    }
}