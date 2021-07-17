using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppTrainer;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class DataSeed {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) {

            //  SEED USERS
            if (!userManager.Users.Any()) {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Afrodite",
                        Bio = "Deusa da fertilidade, dos arqueiros e da caça.",
                        UserName = "Afrodite",
                        Email = "Afroditeu@email.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Athena",
                        Bio = "Deusa dos humanos, sociedade e gente boa.",
                        UserName = "athena",
                        Email = "athena@email.com"
                    },
                     new AppUser
                    {
                        Id = "c",
                        DisplayName = "Poseydom",
                        Bio = "Deus dos mares, mas gosta de terra firme, vive dando em cima da Athena.",
                        UserName = "Poseydom",
                        Email = "Poseydom@email.com"
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Pandora",
                        Bio = "Abriu a caixa por curiosidade e ficou perturbada da cabeça.",
                        UserName = "pandora",
                        Email = "pandora@email.com"
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "Hades",
                        Bio = "Quem manda no reino dos morots.",
                        UserName = "hades",
                        Email = "hades@email.com"
                    }
                };
                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            //  SEED TOMES
            if (!context.Tomes.Any()) {
                var tomes = new List<Tome>
                {
                    new Tome
                    {
                        Title = "Warm-Up",
                        Active = true,
                        Position = 1,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Coordination",
                        Active = true,
                        Position = 2,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Arpeggios",
                        Active = false,
                        Position = 3,
                        AppUserId = "e"
                    },
                     new Tome
                    {
                        Title = "Tapping",
                        Active = true,
                        Position = 4,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Riffs",
                        Active = false,
                        Position = 5,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Clean Arpeggios",
                        Active = true,
                        Position = 6,
                        AppUserId = "e"
                    },
                    new Tome
                    {
                        Title = "Personal Set",
                        Active = false,
                        Position = 7,
                        AppUserId = "e"
                    },
                     new Tome
                    {
                        Title = "Aquecimento",
                        Active = true,
                        Position = 1,
                        AppUserId = "b"
                    },
                    new Tome
                    {
                        Title = "Sincronismo",
                        Active = false,
                        Position = 2,
                        AppUserId = "b"
                    },
                    new Tome
                    {
                        Title = "Escalas",
                        Active = true,
                        Position = 3,
                        AppUserId = "b"
                    },
                     new Tome
                    {
                        Title = "Banda X",
                        Active = false,
                        Position = 4,
                        AppUserId = "b"
                    }
                };
                context.Tomes.AddRange(tomes);
                context.SaveChanges();
            }

            //  SEED ETUDES
            if (!context.Etudes.Any()) {
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
                        Title = "Stretching",
                        Active = true,
                        Fluence = 1,
                        Tome = "Warm-Up",
                        Time = 10,
                        Description = "Strecth all 10 fingers on the 3 positions.",
                        Executions = 10,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-15),
                        LastPlayed = DateTime.Now.AddDays(-10),
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
                        LastPlayed = DateTime.Now.AddDays(-7),
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
                        LastPlayed = DateTime.Now.AddDays(-4),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Picking 4",
                        Active = false,
                        Fluence = 3,
                        Tome = "Warm-Up",
                        Time = 10,
                        Description = "Left Handed Muting picking exercise with hybrid pikcing and 4 picking string",
                        Executions = 2,
                        Played = 20,
                        Created = DateTime.Now.AddDays(-12),
                        LastPlayed = DateTime.Now.AddDays(-8),
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
                        LastPlayed = DateTime.Now.AddDays(-5),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Super Chromatic 2",
                        Active = true,
                        Fluence = 2,
                        Tome = "Coordination",
                        Time = 10,
                        Description = "John Petrucci super Chromatic variation 2",
                        Executions = 7,
                        Played = 105,
                        Created = DateTime.Now.AddDays(-10),
                        LastPlayed = DateTime.Now.AddDays(-6),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Super Chromatic 3",
                        Active = true,
                        Fluence = 2,
                        Tome = "Coordination",
                        Time = 10,
                        Description = "John Petrucci super Chromatic variation 3",
                        Executions = 7,
                        Played = 105,
                        Created = DateTime.Now.AddDays(-15),
                        LastPlayed = DateTime.Now.AddDays(-13),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Triplets Am7",
                        Active = true,
                        Fluence = 1,
                        Tome = "Arpeggios",
                        Time = 5,
                        Description = "Arpeggios in triplets division. Em7 and Am7",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-2),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Double Triplets Em7",
                        Active = true,
                        Fluence = 1,
                        Tome = "Arpeggios",
                        Time = 15,
                        Description = "Arpeggios in triplets division. Em7 and Am7",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "With Tapping",
                        Active = true,
                        Fluence = 1,
                        Tome = "Arpeggios",
                        Time = 15,
                        Description = "Pattern used by Olaf Thorsen on Moonlight",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Arpeggios Malmsteen",
                        Active = true,
                        Fluence = 1,
                        Tome = "Arpeggios",
                        Time = 15,
                        Description = "Trecho do 32 to 64 compass from Arpeggios from Helll",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-2),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Triplets TPH",
                        Active = true,
                        Fluence = 1,
                        Tome = "Tapping",
                        Time = 10,
                        Description = "Tapping on Van Halen Patternt",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Sextines TPH",
                        Active = true,
                        Fluence = 1,
                        Tome = "Tapping",
                        Time = 10,
                        Description = "Tapping on Van Halen Patternt",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now,
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Double Triplets Riffs",
                        Active = true,
                        Fluence = 1,
                        Tome = "Riffs",
                        Time = 15,
                        Description = "Do this on all levels",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-3),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Speed Picking",
                        Active = true,
                        Fluence = 1,
                        Tome = "Riffs",
                        Time = 10,
                        Description = "Speed picking on Melodic Death Metal Style",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-2),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Serrana Arpeggios",
                        Active = true,
                        Fluence = 1,
                        Tome = "Clean Arpeggios",
                        Time = 10,
                        Description = "Do serrana arpeggios on clean guitar.",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Serrana Arpeggios",
                        Active = true,
                        Fluence = 1,
                        Tome = "Clean Arpeggios",
                        Time = 10,
                        Description = "Do serrana arpeggios on clean guitar.",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-2),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Judas Priest - Painkiller",
                        Active = true,
                        Fluence = 1,
                        Tome = "Personal Set",
                        Time = 10,
                        Description = "Guitar Tuned on Bb - 3 Steps Down",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Grave Digger - Rebellion",
                        Active = true,
                        Fluence = 1,
                        Tome = "Personal Set",
                        Time = 10,
                        Description = "Guitar Tuned on Bb - 3 Steps Down",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Amon Amarth - Guardians of Argasd",
                        Active = true,
                        Fluence = 1,
                        Tome = "Personal Set",
                        Time = 10,
                        Description = "Guitar Tuned on Bb - 3 Steps Down",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "Amon Amarth - Versus The World",
                        Active = true,
                        Fluence = 1,
                        Tome = "Personal Set",
                        Time = 10,
                        Description = "Guitar Tuned on Bb - 3 Steps Down",
                        Executions = 5,
                        Played = 100,
                        Created = DateTime.Now.AddDays(-5),
                        LastPlayed = DateTime.Now.AddDays(-1),
                        AppUserId = "e"
                    },
                    new Etude
                    {
                        Title = "GraveWoorm - Nocturnal Hynms",
                        Active = true,
                        Fluence = 1,
                        Tome = "Personal Set",
                        Time = 10,
                        Description = "Guitar Tuned on Bb - 3 Steps Down",
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
            if (!context.Chapters.Any()) {
                var chapters = new List<Chapter>
                {
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-30),
                        TotalTime = 60,
                        TotalEtudes = 10,
                        Objective = 120,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-29),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-25),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-20),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-19),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-15),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-14),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-13),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-10),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                     new Chapter
                    {
                        Day = DateTime.Today.AddDays(-9),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-7),
                        TotalTime = 50,
                        TotalEtudes = 10,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-6),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-5),
                        TotalTime = 15,
                        TotalEtudes = 1,
                        Objective = 40,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-3),
                        TotalTime = 40,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-2),
                        TotalTime = 65,
                        TotalEtudes = 8,
                        Objective = 60,
                        AppUserId = "e"
                    },
                    new Chapter
                    {
                        Day = DateTime.Today.AddDays(-1),
                        TotalTime = 50,
                        TotalEtudes = 4,
                        Objective = 60,
                        AppUserId = "e"
                    }
                };
                context.Chapters.AddRange(chapters);
                context.SaveChanges();
            }
        }
    }
}