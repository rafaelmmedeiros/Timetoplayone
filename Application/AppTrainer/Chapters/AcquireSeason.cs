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
    public class AcquireSeason {

        public class ChapterSeasonEnvelope {
            public List<ChapterSeasonDto> SeasonChapters { get; set; }
        }

        public class Query : IRequest<ChapterSeasonEnvelope> { }

        public class Handler : IRequestHandler<Query, ChapterSeasonEnvelope> {

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChapterSeasonEnvelope> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var chapters = queryable.ToList();
                var monthOnSeason = new List<ChapterSeasonDto>();

                // SEGRAGATE CHAPTER IN SINGLE MONTHS AND DO WHAT HAVE TO DO
                for (int montPrevious = 0; montPrevious < 3; montPrevious++) {

                    var month = new ChapterSeasonDto {
                        Id = Guid.NewGuid()
                    };

                    var totalTimeOnMonth = 0;

                    foreach (var chapter in chapters) {

                        var distanceToToday = (DateTime.Today - chapter.Day).TotalDays;

                        switch (montPrevious) {
                            case 0:
                                if (distanceToToday <= 28) {
                                    month.DayEnd = DateTime.Today;
                                    month.DayStart = DateTime.Today.AddDays(-27);
                                    totalTimeOnMonth += chapter.TotalTime;
                                }
                                break;
                            case 1:
                                if (distanceToToday > 28 && distanceToToday <= 56) {
                                    month.DayEnd = DateTime.Today.AddDays(-28);
                                    month.DayStart = DateTime.Today.AddDays(-55);
                                    totalTimeOnMonth += chapter.TotalTime;
                                }
                                break;
                            case 2:
                                if (distanceToToday > 56 && distanceToToday <= 84) {
                                    month.DayEnd = DateTime.Today.AddDays(-56);
                                    month.DayStart = DateTime.Today.AddDays(-83);
                                    totalTimeOnMonth += chapter.TotalTime;
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    month.TotalTime = totalTimeOnMonth;

                    monthOnSeason.Add(month);
                }

                // FIND THE BEST WEEK
                var bestMonth = monthOnSeason.Max(x => x.TotalTime);

                // ADD DIFF TO BEST
                foreach (var chapterMonth in monthOnSeason) {
                    chapterMonth.DifferenceToBestDay = Math.Round(((double)chapterMonth.TotalTime / bestMonth) * 100, 2);
                }


                return new ChapterSeasonEnvelope {
                    SeasonChapters = monthOnSeason
                };
            }
        }
    }
}