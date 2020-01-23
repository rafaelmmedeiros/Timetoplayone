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
                        SubTitulo = "Estudos de Aquecimento",
                        Descricao = "Fazer os exercicios necessários do dia, sem metromo, sempre devegar com FOCO.",
                        Label = "Basic",
                    },
                    new Grupo
                    {
                        Titulo = "Coordinatuon",
                        SubTitulo = "Estudos de Coordination",
                        Descricao = "Todos os exerciicos de cordenação devem ser feitos com metromo e com treinador de velocidade.",
                        Label = "Basic",
                    },
                    new Grupo
                    {
                        Titulo = "Arpeggios",
                        SubTitulo = "Campo Harmonico Menor",
                        Descricao = "Patterns de Arpeggios em no Campo Harmonico de Am e Em.",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Scales",
                        SubTitulo = "Modo Frigio",
                        Descricao = "Patterns em modo Frigio, fazer todos em cima de uma Harmonia em Strings",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Tapping",
                        SubTitulo = "Tapping Linear",
                        Descricao = "Estudos de Tapping linear, devem ser feitos sobre harmonia em Strings e bateria.",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "RIffs",
                        SubTitulo = "Rhythm Exploration",
                        Descricao = "Extração de fragmentos de música e combinação de figuras musicais",
                        Label = "Tools",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda X",
                        SubTitulo = "Banda X Músicas",
                        Descricao = "Músicas da banda X",
                        Label = "Melting",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda Y",
                        SubTitulo = "Banda Y Músicas",
                        Descricao = "Músicas da banda Y",
                        Label = "Melting",
                    }
                };
                context.Grupos.AddRange(grupos);
                context.SaveChanges();
            }
        }
    }
}