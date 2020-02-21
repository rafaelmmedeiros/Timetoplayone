using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // Entidades a serem geradas pelo Entity Framework
        public DbSet<Value> Values { get; set; }
        public DbSet<Estudo> Estudos { get; set; }
        public DbSet<Grupo> Grupos { get; set; }


        // Seed para Values
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Nome = "João", Sobrenome = "Silva", Idade = 52 },
                    new Value { Id = 2, Nome = "Maria", Sobrenome = "Hoffman", Idade = 22 },
                    new Value { Id = 3, Nome = "Pedro", Sobrenome = "Souza", Idade = 23 },
                    new Value { Id = 4, Nome = "José", Sobrenome = "Correa", Idade = 32 },
                    new Value { Id = 5, Nome = "Akira", Sobrenome = "Duarte", Idade = 14 },
                    new Value { Id = 6, Nome = "Brunna", Sobrenome = "Pereira", Idade = 21 },
                    new Value { Id = 7, Nome = "Natália", Sobrenome = "Pirassununga", Idade = 26 }
                );
        }
    }
}
