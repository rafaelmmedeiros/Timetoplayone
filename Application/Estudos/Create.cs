using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Estudos
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Titulo { get; set; }
            public string Origem { get; set; }
            public string Descricao { get; set; }
            public int BpmInicial { get; set; }
            public int Compassos { get; set; }
            public string Tecnica { get; set; }
            public string SubTecnica { get; set; }
            public int Dificuldade { get; set; }
            public int Proposito { get; set; }
            public int Fluencia { get; set; }
            public int Minutos { get; set; }
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
                var estudo = new Estudo
                {
                    Id = request.Id,
                    Titulo = request.Titulo,
                    Origem = request.Origem,
                    Descricao = request.Descricao,
                    BpmInicial = request.BpmInicial,
                    Compassos = request.Compassos,
                    Tecnica = request.Tecnica,
                    SubTecnica = request.SubTecnica,
                    Dificuldade = request.Dificuldade,
                    Proposito = request.Proposito,
                    Fluencia = request.Fluencia,
                    Minutos = request.Minutos,
                    VezesPraticado = request.VezesPraticado,
                    TempoPraticado = request.TempoPraticado,
                    DataCriacao = request.DataCriacao,
                    PrimeiroTreino = request.PrimeiroTreino,
                    UltimoTreino = request.UltimoTreino,
                };

                _context.Estudos.Add(estudo);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Erro ao salvar modicações");
                
            }
        }
    }
}