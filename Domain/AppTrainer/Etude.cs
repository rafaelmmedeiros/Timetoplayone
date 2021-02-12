using System;

namespace Domain.AppTrainer
{
    public class Etude
    {
        public Guid Id { get; set; } // CREATE
        public string Title { get; set; } // CREATE
        public bool Active { get; set; } // CREATE MAP // Change Active
        public int Fluence { get; set; } // 1 Learning 2 Evolution 3 Flowing
        public string Tome { get; set; } // CREATE
        public int Time { get; set; } // CREATE
        public string Description { get; set; } // CREATE

        //  COMPUTEDS
        public int Executions { get; set; } // Tasks Tab...
        public int Played { get; set; } // Tasks Tab...

        //  Dates
        public DateTime Created { get; set; } // CREATE MAP
        public DateTime LastPlayed { get; set; } // Tasks Tab...

        //  RELATIONS
        public string AppUserId { get; set; }


    }
}