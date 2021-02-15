using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppTrainer;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class DataSeed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            //  SEED USERS
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Shiryu",
                        Bio = "Caveleiro de Bronze, armadura de Dragão.",
                        UserName = "shiryu",
                        Email = "shiryu@email.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Athena",
                        Bio = "Deusa Atehna, precisa de mais alguma coisa?",
                        UserName = "athena",
                        Email = "athena@email.com"
                    },
                     new AppUser
                    {
                        Id = "c",
                        DisplayName = "Ikki",
                        Bio = "Caveleiro de Bronze. armadura de Fênix.",
                        UserName = "ikki",
                        Email = "ikki@email.com"
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Pandora",
                        Bio = "Abriu a caixa por curiosidade e agora ficou perturbada da cabeça.",
                        UserName = "pandora",
                        Email = "pandora@email.com"
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "Hades",
                        Bio = "Hades...the great!! The master of darkness.",
                        UserName = "hades",
                        Email = "hades@email.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            //  SEED TOMES
            if (!context.Tomes.Any())
            {
                var tomes = new List<Tome>
                {
                    new Tome
                    {
                        Title = "Warm-Up",
                        Active = true,
                        Position = 1,
                        TotalEtudes = 3,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Coordination",
                        Active = true,
                        Position = 2,
                        TotalEtudes = 2,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Arpeggios",
                        Active = false,
                        Position = 3,
                        TotalEtudes = 0,
                        AppUserId = "e"
                    },
                     new Tome
                    {
                        Title = "Tapping",
                        Active = true,
                        Position = 4,
                        TotalEtudes = 0,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Riffs",
                        Active = false,
                        Position = 5,
                        TotalEtudes = 0,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Clean Arpeggios",
                        Active = true,
                        Position = 6,
                        TotalEtudes = 0,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Repertório X",
                        Active = false,
                        Position = 7,
                        TotalEtudes = 0,
                        AppUserId = "e"
                    },
                     new Tome
                    {
                        Title = "Aquecimento",
                        Active = true,
                        Position = 1,
                        TotalEtudes = 0,
                        AppUserId = "b"
                    },
                    new Tome
                    {
                        Title = "Sincronismo",
                        Active = false,
                        Position = 2,
                        TotalEtudes = 0,
                        AppUserId = "b"
                    },
                    new Tome
                    {
                        Title = "Escalas",
                        Active = true,
                        Position = 3,
                        TotalEtudes = 0,
                        AppUserId = "b"
                    },
                     new Tome
                    {
                        Title = "Banda X",
                        Active = false,
                        Position = 4,
                        TotalEtudes = 0,
                        AppUserId = "b"
                    }
                };
                context.Tomes.AddRange(tomes);
                context.SaveChanges();
            }

            //  SEED ETUDES
            if (!context.Etudes.Any())
            {
                var etudes = new List<Etude>
                {
                    new Etude
                    {
                        Title = "X-Hands",
                        Active = true,
                        Fluence = 1,
                        Tome = "Warm-Up",
                        Time = 10,
                        Description = "Classic X-hands from John Petrucci",
                        Executions = 10,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Picking 2",
                        Active = true,
                        Fluence = 2,
                        Tome = "Warm-Up",
                        Time = 10,
                        Description = "Left Handed Muting picking exercise 2 pikcing string",
                        Executions = 8,
                        Played = 80,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Picking 3",
                        Active = false,
                        Fluence = 3,
                        Tome = "Warm-Up",
                        Time = 10,
                        Description = "Left Handed Muting picking exercise with hybrid pikcing",
                        Executions = 2,
                        Played = 20,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Super Chromatic",
                        Active = true,
                        Fluence = 2,
                        Tome = "Coordination",
                        Time = 15,
                        Description = "John Petrucci super Chromatic",
                        Executions = 7,
                        Played = 105,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Speed Picking",
                        Active = true,
                        Fluence = 1,
                        Tome = "Coordination",
                        Time = 20,
                        Description = "Seguir partitura do arquivo",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Super Chromatic",
                        Active = true,
                        Fluence = 2,
                        Tome = "Escalas",
                        Time = 15,
                        Description = "John Petrucci super Chromatic",
                        Executions = 7,
                        Played = 105,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now,
                        AppUserId = "b"
                    },
                    new Etude
                    {
                        Title = "Speed Picking",
                        Active = true,
                        Fluence = 2,
                        Tome = "Escalas",
                        Time = 20,
                        Description = "Seguir partitura do arquivo",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now,
                        AppUserId = "b"
                    }
                };
                context.Etudes.AddRange(etudes);
                context.SaveChanges();
            }

            //  SEED CHAPTERS
            if (!context.Chapters.Any())
            {
                var chapters = new List<Chapter>
                {
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-30),
                        TotalTime = 60,
                        TotalEtudes = 10,
                        Objective = 120,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-29),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-25),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-20),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-19),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-15),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-14),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-13),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-10),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                     new Chapter
                    {
                        Day = DateTime.Now.AddDays(-9),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-6),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Now.AddDays(-2),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    }
                };
                context.Chapters.AddRange(chapters);
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
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "Coordinatuon",
                        SubTitulo = "Estudos de Coordination",
                        Descricao = "Todos os exerciicos de cordenação devem ser feitos com metromo e com treinador de velocidade.",
                        Label = "Basic",
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "Arpeggios",
                        SubTitulo = "Campo Harmonico Menor",
                        Descricao = "Patterns de Arpeggios em no Campo Harmonico de Am e Em.",
                        Label = "Tools",
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "Scales",
                        SubTitulo = "Modo Frigio",
                        Descricao = "Patterns em modo Frigio, fazer todos em cima de uma Harmonia em Strings",
                        Label = "Tools",
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "Tapping",
                        SubTitulo = "Tapping Linear",
                        Descricao = "Estudos de Tapping linear, devem ser feitos sobre harmonia em Strings e bateria.",
                        Label = "Tools",
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "RIffs",
                        SubTitulo = "Rhythm Exploration",
                        Descricao = "Extração de fragmentos de música e combinação de figuras musicais",
                        Label = "Tools",
                        //AppUserId = "a",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda X",
                        SubTitulo = "Banda X Músicas",
                        Descricao = "Músicas da banda X",
                        Label = "Melting",
                        //AppUserId = "b",
                    },
                    new Grupo
                    {
                        Titulo = "Repertório Banda Y",
                        SubTitulo = "Banda Y Músicas",
                        Descricao = "Músicas da banda Y",
                        Label = "Melting",
                        //AppUserId = "c",
                    }
                };
                context.Grupos.AddRange(grupos);
                context.SaveChanges();
            }
        }
    }
}