using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Grupos
{
    public class List
    {
        public class Query : IRequest<List<Grupo>> { }

        public class Handler : IRequestHandler<Query, List<Grupo>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Grupo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var grupos = await _context.Grupos.ToListAsync();

                return grupos;
            }
        }

    }
}