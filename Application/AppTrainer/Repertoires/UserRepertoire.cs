using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Repertoires
{
    public class UserRepertoire
    {
        public string Username { get; set; }
        public ICollection<Repertoire> Repertoires { get; set; }

    }
}