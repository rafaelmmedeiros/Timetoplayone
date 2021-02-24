using System;
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
                var weeksOnMonth = new List<ChapterMonthDto>();

                // SEGRAGATE CHAPTER IN SINGLE WEEKS AND DO WHAT HAVE TO DO
                for (int weekPrevious = 0; weekPrevious < 4; weekPrevious++) {

                    var week = new ChapterMonthDto {
                        Id = Guid.NewGuid()
                    };

                    var totalTimeOnWeek = 0;

                    foreach (var chapter in chapters) {

                        var distanceToToday = (DateTime.Today - chapter.Day).TotalDays;

                        switch (weekPrevious) {
                            case 0:
                                if (distanceToToday <= 7) {
                                    week.DayEnd = DateTime.Today;
                                    week.DayStart = DateTime.Today.AddDays(-6);
                                    totalTimeOnWeek += chapter.TotalTime;
                                }
                                break;
                            case 1:
                                if (distanceToToday > 7 && distanceToToday <= 14) {
                                    week.DayEnd = DateTime.Today.AddDays(-7);
                                    week.DayStart = DateTime.Today.AddDays(-13);
                                    totalTimeOnWeek += chapter.TotalTime;
                                }
                                break;
                            case 2:
                                if (distanceToToday > 14 && distanceToToday <= 21) {
                                    week.DayEnd = DateTime.Today.AddDays(-14);
                                    week.DayStart = DateTime.Today.AddDays(-20);
                                    totalTimeOnWeek += chapter.TotalTime;
                                }
                                break;
                            case 3:
                                if (distanceToToday > 21 && distanceToToday <= 28) {
                                    week.DayEnd = DateTime.Today.AddDays(-21);
                                    week.DayStart = DateTime.Today.AddDays(-27);
                                    totalTimeOnWeek += chapter.TotalTime;
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    week.TotalTime = totalTimeOnWeek;

                    weeksOnMonth.Add(week);
                }

                // FIND THE BEST WEEK
                var bestWeek = weeksOnMonth.Max(x => x.TotalTime);

                // ADD DIFF TO BEST
                foreach (var chapterWeek in weeksOnMonth) {
                    chapterWeek.DifferenceToBestDay = Math.Round(((double)chapterWeek.TotalTime / bestWeek) * 100, 2);
                }


                return new ChapterMonthEnvelope {
                    MonthChapters = weeksOnMonth
                };

            }
        }
    }
}