using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Chapters
{
    public interface DecreaseObjective
    {
        public class Command : IRequest
        {

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

                var chapter = await _context.Chapters.FirstOrDefaultAsync(x => x.Day == DateTime.Today && x.AppUserId == user.Id);

                // SECURITY
                if (chapter == null)
                    throw new RESTException(HttpStatusCode.NotFound, new { chapter = "Not found" });

                if (chapter != null)
                {
                    if (chapter.Objective < 10)
                    {
                        chapter.Objective = 0;
                        throw new RESTException(HttpStatusCode.NotFound, new { chapter = "Impossible to decrease" });

                    }
                    else
                    {
                        chapter.Objective -= 10;
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving r");
            }
        }
    }
}