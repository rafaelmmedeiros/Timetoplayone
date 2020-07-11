using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Repertoires
{
    public class Details
    {
        public class Query : IRequest<UserRepertoire>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserRepertoire>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<UserRepertoire> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                // MANUAL MAPPING
                return new UserRepertoire
                {
                    Repertoires = user.UserRepertoires
                };
            }
        }

    }
}