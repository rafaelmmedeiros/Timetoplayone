using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Chapters.Others {
    public class AcquireMonth {

        public class ChapterMonthEnvelope {
            public List<ChapterMonthDto> MonthChapters { get; set; }
        }

        public class Query : IRequest<ChapterMonthEnvelope> { }

        public class Handler : IRequestHandler<Query, ChapterMonthEnvelope> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChapterMonthEnvelope> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var chapters = queryable.ToList();
                var chapterOnMonth = new List<ChapterMonthDto>();

                foreach (var chapter in chapters) {
                    var userChapter = new ChapterMonthDto {
                        Id = chapter.Id,
                        Day = chapter.Day,
                        TotalTime = chapter.TotalTime
                    };

                    chapterOnMonth.Add(userChapter);
                }

                return new ChapterMonthEnvelope {
                    MonthChapters = chapterOnMonth
                };

            }
        }
    }
}