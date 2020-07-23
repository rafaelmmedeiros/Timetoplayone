using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections.Others
{
    public class UserCollection
    {
        public string Username { get; set; }
        public ICollection<Etude> Etudes { get; set; }
    }
}