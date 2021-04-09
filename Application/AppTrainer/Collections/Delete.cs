using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections {
    public class Delete {
        public class Command : IRequest {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var etude = await _context.Etudes.FindAsync(request.Id);

                //  SECURITY
                if (etude == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { etude = "Not Found" });

                if (etude.AppUserId != user.Id)
                    throw new RESTException(HttpStatusCode.Forbidden, new { etude = "Forbiden - Is not the owner" });

                if (etude.Active == true)
                    throw new RESTException(HttpStatusCode.Forbidden, new { etude = "Is active" });

                _context.Etudes.Remove(etude);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error deleting Etude");
            }
        }
    }
}