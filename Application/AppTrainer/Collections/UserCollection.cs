using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections
{
    public class UserCollection
    {
        public string Username { get; set; }
        public ICollection<Etude> Etudes { get; set; }
    }
}