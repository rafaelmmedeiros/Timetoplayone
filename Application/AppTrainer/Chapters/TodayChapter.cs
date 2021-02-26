using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Chapters.Others;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Chapters {
    public class TodayChapter {
        public class Query : IRequest<ChapterTodayDto> {
            public Query() {
            }
        }

        public class Handler : IRequestHandler<Query, ChapterTodayDto> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper) {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<ChapterTodayDto> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var chapter = await _context.Chapters.FirstOrDefaultAsync(x => x.Day == DateTime.Today && x.AppUserId == user.Id);

                var chapterToReturn = _mapper.Map<Chapter, ChapterTodayDto>(chapter);

                return chapterToReturn;
            }
        }
    }
}