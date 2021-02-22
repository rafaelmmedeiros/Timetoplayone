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

namespace Application.AppTrainer.Chapters
{
    public class AcquireWeek
    {
        public class ChaptersWeekEnvelope
        {
            public List<ChapterWeekDto> WeekChapters { get; set; }
        }

        public class Query : IRequest<ChaptersWeekEnvelope> { }

        public class Handler : IRequestHandler<Query, ChaptersWeekEnvelope>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChaptersWeekEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var chapters = queryable.ToList();
                var chaptersToProcessing = new List<ChapterWeekDto>();

                foreach (var chapter in chapters)
                {
                    var userChapter = new ChapterWeekDto
                    {
                        Id = chapter.Id,
                        Day = chapter.Day
                    };

                    if ((DateTime.Now - userChapter.Day).TotalDays <= 7)
                    {
                        chaptersToProcessing.Add(userChapter);
                    }
                }

                return new ChaptersWeekEnvelope
                {
                    WeekChapters = chaptersToProcessing
                };
            }
        }
    }
}