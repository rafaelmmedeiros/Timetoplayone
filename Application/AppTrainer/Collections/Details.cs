using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections
{
    public class Details
    {
        public class Query : IRequest<UserCollection>
        {
        }

        public class Handler : IRequestHandler<Query, UserCollection>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<UserCollection> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                // MANUAL MAPPING
                return new UserCollection
                {
                    Username = user.UserName,
                    Etudes = user.Etudes
                };
            }
        }
    }
}