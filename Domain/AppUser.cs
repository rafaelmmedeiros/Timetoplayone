using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        
        // RELATIONS
        public virtual ICollection<Grupo> UserGrupos { get; set; }
        public virtual ICollection<Photo> UserPhotos { get; set; }
    }
}