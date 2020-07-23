using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Lores.Others
{
    public class UserLore
    {
        public string Username { get; set; } // TESTE PURPOSE
        public int Total { get; set; } // TESTE PURPOSE
        public int Time { get; set; } // TESTE PURPOSE
        public ICollection<Tome> Tomes { get; set; }

    }
}