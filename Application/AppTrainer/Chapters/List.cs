using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Chapters.Others;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using Domain.AppTrainer;

namespace Application.AppTrainer.Chapters {
    public class List {
        public class ChapterEnvelope {
            public List<ChapterListDto> Chapters { get; set; }
        }

        public class Query : IRequest<ChapterEnvelope> {
            public Query() {
                // FOR FILTERING
            }
        }

        public class Handler : IRequestHandler<Query, ChapterEnvelope> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ChapterEnvelope> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Chapters
                    .Where(a => a.AppUserId == user.Id)
                    .OrderByDescending(b => b.Day)
                    .AsQueryable();

                var chapters = await queryable
                    .ToListAsync();

                return new ChapterEnvelope {
                    Chapters = _mapper.Map<List<Chapter>, List<ChapterListDto>>(chapters)
                };
            }
        }
    }
}