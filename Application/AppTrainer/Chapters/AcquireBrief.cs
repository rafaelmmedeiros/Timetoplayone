using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Chapters.Others;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Chapters {
    public class AcquireBrief {
        public class Query : IRequest<ChapterWeekBriefDto> { }
        public class Handler : IRequestHandler<Query, ChapterWeekBriefDto> {

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChapterWeekBriefDto> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id && a.Day > DateTime.Today.AddDays(-7))
                    .AsQueryable();

                var chapters = queryable.ToList();
                var totalEtudes = 0;
                var totalTime = 0;

                foreach (var chapter in chapters) {
                    totalEtudes += chapter.TotalEtudes;
                    totalTime += chapter.TotalTime;
                }

                var chapterWeekBrief = new ChapterWeekBriefDto {
                    TotalEtudes = totalEtudes,
                    TotalTIme = Math.Round((double)totalTime / 60, 1),
                    AverageDay = Math.Round(((double)totalTime / 7) / 60, 1)
                };

                return chapterWeekBrief;
            }
        }
    }
}

