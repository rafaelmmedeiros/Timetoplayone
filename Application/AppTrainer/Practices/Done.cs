using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Practices
{
    public class Done
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

                var etude = await _context.Etudes.FindAsync(request.Id);

                var chapter = await _context.Chapters.FirstOrDefaultAsync(x => x.Day == DateTime.Today && x.AppUserId == user.Id);

                //  SECURITY

                //  EDIT CHAPTER
                if (chapter == null)
                {
                    var chapterToCreate = new Chapter
                    {
                        Day = DateTime.Today,
                        TotalTime = etude.Time,
                        TotalEtudes = 1,
                        Objective = 120,
                        AppUserId = user.Id
                    };

                    _context.Chapters.Add(chapterToCreate);
                }
                else
                {
                    chapter.TotalTime += etude.Time;
                    chapter.TotalEtudes++;
                }

                //  EDIT ETUDE
                etude.Played += etude.Time;
                etude.Executions++;
                etude.LastPlayed = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Erro ao salvar");
            }
        }

    }
}