using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Lores
{
    public class SetUp
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var tome = user.Tomes.FirstOrDefault(x => x.Id == request.Id);

                var tomeNext = user.Tomes.FirstOrDefault(x => x.Position == tome.Position + 1);

                // SECURITY
                if (tome == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { Tome = "Not found" });

                if (tomeNext == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { Tome = "There is no Next" });

                // SWAP POSITIONS
                if (tome != null)
                {
                    tome.Position++;
                    tomeNext.Position--;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving");
            }
        }
    }
}