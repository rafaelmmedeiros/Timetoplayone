using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles {
    public class Details {
        public class Query : IRequest<UserProfile> {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProfile> {
            private readonly DataContext _context;
            public Handler(DataContext context) {
                _context = context;
            }

            public async Task<UserProfile> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                // MANUAL MAPPING
                return new UserProfile {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Bio = user.Bio,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    Photos = user.Photos
                };
            }
        }
    }
}