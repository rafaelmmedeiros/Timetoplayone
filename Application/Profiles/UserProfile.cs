using System.Collections.Generic;
using Domain.App;

namespace Application.Profiles
{
    public class UserProfile
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}