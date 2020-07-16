using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Tome { get; set; }
            public int Time { get; set; }
            public string Description { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var etude = new Etude
                {
                    Id = request.Id,
                    Title = request.Title,
                    Active = true,
                    Tome = request.Tome,
                    Time = request.Time,
                    Description = request.Description,
                    Executions = 0,
                    Played = 0,
                    Created = DateTime.Now,
                    AppUserId = user.Id
                };

                _context.Etudes.Add(etude);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving etude");
            }
        }
    }
}