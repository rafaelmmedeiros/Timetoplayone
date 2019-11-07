using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Estudos
{
    public class Details
    {
        public class Query : IRequest<Estudo>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Estudo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Estudo> Handle(Query request, CancellationToken cancellationToken)
            {
                var estudo = await _context.Estudos.FindAsync(request.Id);

                return estudo;
            }
        }
    }
}