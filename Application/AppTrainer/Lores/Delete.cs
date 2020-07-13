using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.AppTrainer.Lores
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var repertoire = await _context.Repertoires.FindAsync(request.Id);

                if (repertoire == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { repertoire = "Not Found" });

                _context.Repertoires.Remove(repertoire);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error deleting repertorie");
            }
        }
    }
}