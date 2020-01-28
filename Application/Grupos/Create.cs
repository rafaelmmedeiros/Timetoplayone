using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Grupos
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Titulo { get; set; }
            public string SubTitulo { get; set; }
            public string Descricao { get; set; }
            public string Label { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.SubTitulo).NotEmpty();
                RuleFor(x => x.Descricao).NotEmpty();
                RuleFor(x => x.Label).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var grupo = new Grupo
                {
                    Id = request.Id,
                    Titulo = request.Titulo,
                    SubTitulo = request.SubTitulo,
                    Descricao = request.Descricao,
                    Label = request.Label,
                };

                _context.Grupos.Add(grupo);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Erro ao salvar");

            }
        }

    }
}