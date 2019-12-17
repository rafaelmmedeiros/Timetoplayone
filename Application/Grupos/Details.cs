using System;
using System.Threading;
using System.Threading.Tasks;
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

                return grupo;
            }
        }
    }
}