using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain.AppTrainer;
using FluentValidation;
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

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .Length(3, 15);
                RuleFor(x => x.Tome)
                    .NotEmpty();
                RuleFor(x => x.Time)
                    .NotEmpty()
                    .LessThanOrEqualTo(60)
                    .GreaterThan(0);
                RuleFor(x => x.Description)
                    .MaximumLength(250);
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

                //  RULES
                //  User não deve ter mais de 1000 Etude.
                if (user.Etudes.Count() >= 1000)
                    throw new RESTException(HttpStatusCode.Forbidden, new { Tomes = "Forbidden, limit of 1000 etudes" });

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