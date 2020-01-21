using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            //  SEED ESTUDOS
            if (!context.Estudos.Any())
            {
                var estudos = new List<Estudo>
                {
                    new Estudo
                    {
                        Titulo = "Arpejos com 6 Cordas Diminutos",
                        Origem = "Arpeggios for the Modenr Guitarrist Pagina 25-2",
                        Descricao = "Fazer em Em",
                        BpmInicial = 95,
                        Tecnica = "Arpeggios",
                        Dificuldade = 2,
                        Proposito = 2,
                        Fluencia = 0,
                        Minutos = 10,
                        VezesPraticado = 4,
                        TempoPraticado = 40,
                        DataCriacao = DateTime.Now.AddDays(-5),
                        PrimeiroTreino = DateTime.Now.AddDays(-5),
                        UltimoTreino = DateTime.Now.AddDays(-1),
                    },
                    new Estudo
                    {
                        Titulo = "Arpejos com 5 Cordas Menores",
                        Origem = "Arpeggios for the Modenr Guitarrist Pagina 25-1",
                        Descricao = "Fazer em Am",
                        BpmInicial = 105,
                        Tecnica = "Arpeggios",
                        Dificuldade = 1,
                        Proposito = 2,
                        Fluencia = 0,
                        Minutos = 10,
                        VezesPraticado = 1,
                        TempoPraticado = 10,
                        DataCriacao = DateTime.Now.AddDays(-3),
                        PrimeiroTreino = DateTime.Now.AddDays(-3),
                        UltimoTreino = DateTime.Now.AddDays(-3),
                    }
                };
                context.Estudos.AddRange(estudos);
                context.SaveChanges();
            }

            //  SEED GRUPOS
            if (!context.Grupos.Any())
            {
                var grupos = new List<Grupo>
                {
                    new Grupo
                    {
                        Titulo = "Warm-Up",
                        Descricao = "Todos estudos de Coordination",
                        Label = "Basic",
                    },
                    new Grupo
                    {
                        Titulo = "Coordinatuon",
                        Descricao = "Todos estudos de Coordination",
                        Label = "Basic",
                    },
                    new Grupo
                    {
                        Titulo = "Arpeggios",
                        Descricao = "Todos estudos de Arpeggios",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Scales",
                        Descricao = "Todos estudos de Escalas",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Tapping",
                        Descricao = "Todos estudos de Tapping",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "RIffs",
                        Descricao = "Todos estudos de Riffs",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda 1",
                        Descricao = "Músicas da banda 1",
                        Label = "Melting",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda 2",
                        Descricao = "Músicas da banda 2",
                        Label = "Melting",
                    }
                };
                context.Grupos.AddRange(grupos);
                context.SaveChanges();
            }
        }
    }
}