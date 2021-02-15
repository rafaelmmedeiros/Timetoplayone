using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Util;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserAccessor _userAccessor;
            private readonly ITomeTotalEtudes _tomeTotalEtudes;
            public Handler(DataContext context, IUserAccessor userAccessor, ITomeTotalEtudes tomeTotalEtudes)
            {
                _tomeTotalEtudes = tomeTotalEtudes;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var tome = await _context.Tomes.FindAsync(request.Id);

                var tomeTotalEtudes = await _tomeTotalEtudes.GetTomeQuantity(tome.Title);

                if (tome == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { tome = "Not Found" });

                if (tome.AppUserId != user.Id)
                    throw new RESTException(HttpStatusCode.Forbidden, new { tome = "Forbidden" });

                if (tomeTotalEtudes > 0)
                    throw new RESTException(HttpStatusCode.Forbidden, new { tome = "Is Not Empty" });

                //  POSITION CORRECTION
                var startPosition = tome.Position;
                var tomesQuantity = user.Tomes.Count;

                while (startPosition < tomesQuantity)
                {
                    startPosition++;
                    var nextTome = await _context.Tomes.FirstOrDefaultAsync(x => x.Position == startPosition);
                    nextTome.Position--;

                }

                _context.Tomes.Remove(tome);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error deleting tome");
            }
        }
    }
}