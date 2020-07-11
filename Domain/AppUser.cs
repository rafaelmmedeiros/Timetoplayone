using System.Collections.Generic;
using Domain.App;
using Domain.AppTrainer;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        // RELATIONS
        public virtual ICollection<Grupo> UserGrupos { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Repertoire> Repertoires { get; set; }
    }
}