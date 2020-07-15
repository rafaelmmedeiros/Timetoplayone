using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections
{
    public class UserCollection
    {
        public string Username { get; set; } // TESTE PURPOSE
        public ICollection<Etude> Etudes { get; set; }
    }
}