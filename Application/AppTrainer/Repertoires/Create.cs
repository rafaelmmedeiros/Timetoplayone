using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.AppTrainer;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Repertoires
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Color { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty()
                    .Length(3, 15);
                RuleFor(x => x.Color).NotEmpty();
                // TODO: Create a validation for color.
            }
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

                var repertoire = new Repertoire
                {
                    Id = request.Id,
                    Title = request.Title,
                    Color = request.Color,
                    AppUserId = user.Id
                };

                _context.Repertoires.Add(repertoire);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving repertoire");
            }
        }
    }
}