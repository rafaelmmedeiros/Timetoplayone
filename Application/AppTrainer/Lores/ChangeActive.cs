using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Lores
{
    public class ChangeActive
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

                if (tome.AppUserId != user.Id)
                    throw new Errors.RESTException(HttpStatusCode.Forbidden, new { etude = "Not belongs to you... " });

                if (tome == null)
                    throw new Errors.RESTException(HttpStatusCode.NotFound, new { etude = "Not Found" });

                tome.Active = !tome.Active;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error Saving tome");
            }
        }
    }
}