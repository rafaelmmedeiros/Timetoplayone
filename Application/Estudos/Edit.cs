using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Estudos
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Titulo { get; set; }
            public string Origem { get; set; }
            public string Descricao { get; set; }
            public int? BpmInicial { get; set; }
            public int? Compassos { get; set; }
            public string Tecnica { get; set; }
            public string SubTecnica { get; set; }
            public int? Dificuldade { get; set; }
            public int? Proposito { get; set; }
            public int? Fluencia { get; set; }
            public int? Minutos { get; set; }
            public int VezesPraticado { get; set; }
            public int TempoPraticado { get; set; }
            public DateTime DataCriacao { get; set; }
            public DateTime PrimeiroTreino { get; set; }
            public DateTime UltimoTreino { get; set; }

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

                var estudo = await _context.Estudos.FindAsync(request.Id);

                if (estudo == null)
                    throw new Exception("Estudo não Encontrado");

                estudo.Titulo = request.Titulo ?? estudo.Titulo;
                estudo.Origem = request.Origem ?? estudo.Origem;
                estudo.Descricao = request.Descricao ?? estudo.Descricao;
                estudo.BpmInicial = request.BpmInicial ?? estudo.BpmInicial;
                estudo.Compassos = request.Compassos ?? estudo.Compassos;
                estudo.Tecnica = request.Tecnica ?? estudo.Tecnica;
                estudo.SubTecnica = request.SubTecnica ?? estudo.SubTecnica;
                estudo.Dificuldade = request.Dificuldade ?? estudo.Dificuldade;
                estudo.Proposito = request.Proposito ?? estudo.Proposito;
                estudo.Fluencia = request.Fluencia ?? estudo.Fluencia;
                estudo.Minutos = request.Minutos ?? estudo.Minutos;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Erro ao salvar alterações");
            }
        }
    }
}