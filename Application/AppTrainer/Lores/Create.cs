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

namespace Application.AppTrainer.Lores
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .Length(3, 15);
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
                var tomeToFind = await _context.Tomes.SingleOrDefaultAsync(x => x.Title == request.Title);

                if (tomeToFind != null)
                    throw new RESTException(HttpStatusCode.Forbidden, new { Tomes = "Forbidden, This tile is already used" });

                //  User não deve ter mais de 10 Tomes.
                if (user.Tomes.Count() >= 10)
                    throw new RESTException(HttpStatusCode.Forbidden, new { Tomes = "Forbidden, limit of 10 tomes" });

                var tome = new Tome
                {
                    Id = request.Id,
                    Position = user.Tomes.Count()+1,
                    Title = request.Title,
                    AppUserId = user.Id
                };

                _context.Tomes.Add(tome);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error saving tome");
            }
        }
    }
}