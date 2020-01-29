using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Grupos
{
    public class Details
    {
        public class Query : IRequest<Grupo>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Grupo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Grupo> Handle(Query request, CancellationToken cancellationToken)
            {
                var grupo = await _context.Grupos.FindAsync(request.Id);

                if (grupo == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { grupo = "Not Found" });

                return grupo;
            }
        }
    }
}