using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Grupos
{
    public class Details
    {
        public class Query : IRequest<GrupoDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, GrupoDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<GrupoDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var grupo = await _context.Grupos.FindAsync(request.Id);

                if (grupo == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { grupo = "Not Found" });

                var grupoToReturn = _mapper.Map<Grupo, GrupoDto>(grupo);

                return grupoToReturn;
            }
        }
    }
}