using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Estudos
{
    public class List
    {
        public class Query : IRequest<List<Estudo>> { }

        public class Handler : IRequestHandler<Query, List<Estudo>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Estudo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var estudos = await _context.Estudos.ToListAsync();

                return estudos;
            }
        }
    }
}