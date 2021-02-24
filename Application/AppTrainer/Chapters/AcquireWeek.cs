using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Chapters.Others;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Chapters {
    public class AcquireWeek {
        public class ChaptersWeekEnvelope {
            public List<ChapterWeekDto> WeekChapters { get; set; }
        }

        public class Query : IRequest<ChaptersWeekEnvelope> { }

        public class Handler : IRequestHandler<Query, ChaptersWeekEnvelope> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChaptersWeekEnvelope> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var chapters = queryable.ToList();
                var chaptersOnWeek = new List<ChapterWeekDto>();
                var chaptersToComplete = new List<ChapterWeekDto>();

                // ADD TO LIST CHAPATERS INCLUDE ON THE LAST SEVEN DAYS
                foreach (var chapter in chapters) {
                    var userChapter = new ChapterWeekDto {
                        Id = chapter.Id,
                        Day = chapter.Day,
                        TotalTime = chapter.TotalTime
                    };

                    if ((DateTime.Today - userChapter.Day).TotalDays <= 7) {
                        chaptersOnWeek.Add(userChapter);
                    }
                }

                // FIND THE BEST DAY
                var bestWeekDay = chaptersOnWeek.Max(x => x.TotalTime);

                // ADD ABSENT CHAPATER
                for (int interval = 0; interval < 7; interval++) {
                    var element = new ChapterWeekDto { };

                    foreach (var chapter in chaptersOnWeek) {
                        if ((DateTime.Today - chapter.Day).TotalDays == interval) {
                            chapter.DifferenceToBestDay = Math.Round(((double)chapter.TotalTime / bestWeekDay) * 100, 2);
                            
                            element = chapter;
                            break;

                        } else {
                            var notPlayedElement = new ChapterWeekDto {
                                Id = Guid.NewGuid(),
                                Day = DateTime.Today.AddDays(-interval),
                            };

                            element = notPlayedElement;
                        }
                    }

                    chaptersToComplete.Add(element);
                }

                return new ChaptersWeekEnvelope {
                    WeekChapters = chaptersToComplete
                };
            }
        }
    }
}