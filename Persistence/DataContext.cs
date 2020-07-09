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
        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
