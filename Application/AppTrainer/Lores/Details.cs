using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Lores
{
    public class Details
    {
        public class Query : IRequest<UserLore>
        {
        }

        public class Handler : IRequestHandler<Query, UserLore>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<UserLore> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                // MANUAL MAPPING
                return new UserLore
                {
                    Username = user.UserName,
                    Total = user.Photos.Count(),
                    Time = user.Tomes.Count(),
                    Tomes = user.Tomes
                };
            }
        }

    }
}