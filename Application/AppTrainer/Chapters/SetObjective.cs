using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Chapters
{
    public class SetObjective
    {
        public class Command : IRequest
        {
            public int Objective { get; set; }
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

                if (chapter == null)
                {
                    var chapterToCreate = new Chapter
                    {
                        Day = DateTime.Today,
                        TotalTime = 0,
                        TotalEtudes = 0,
                        Objective = request.Objective,
                        AppUserId = user.Id
                    };

                    _context.Chapters.Add(chapterToCreate);
                }
                else
                {
                    if (chapter.Objective == request.Objective)
                    {
                        throw new Errors.RESTException(HttpStatusCode.Unauthorized, new { chapter = "No modification" });
                    }
                    else
                    {
                        chapter.Objective = request.Objective;
                    }
                }

                // handler logic
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving objective");
            }
        }

    }
}