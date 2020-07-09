using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
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
                        Bio = "Hades...",
                        UserName = "hades",
                        Email = "hades@email.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
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