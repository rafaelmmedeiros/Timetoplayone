using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections {
    public class Edit {
        public class Command : IRequest {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Tome { get; set; }
            public string Time { get; set; }
            public string Description { get; set; }

        }
        
        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator() {
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .Length(3, 15);
                RuleFor(x => x.Tome)
                    .NotEmpty();
                RuleFor(x => x.Time)
                    .NotEmpty()
                    .MaximumLength(2);
                RuleFor(x => x.Description)
                    .MaximumLength(250);
            }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var etude = await _context.Etudes.FindAsync(request.Id);

                if (etude.AppUserId != user.Id)
                    throw new Errors.RESTException(HttpStatusCode.Forbidden, new { etude = "Not belongs to you... " });

                if (etude == null)
                    throw new Errors.RESTException(HttpStatusCode.NotFound, new { etude = "Not Found" });

                int? timeInt = Int32.Parse(request.Time);

                etude.Title = request.Title ?? etude.Title;
                etude.Tome = request.Tome ?? etude.Tome;
                etude.Time = timeInt ?? etude.Time;
                etude.Description = request.Description ?? etude.Description;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving Etude");
            }
        }

    }
}