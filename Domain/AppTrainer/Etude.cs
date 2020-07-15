using System;

namespace Domain.AppTrainer
{
    public class Etude
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public string Tome { get; set; }
        public int Time { get; set; }
        public string Description { get; set; }

        //  COMPUTEDS
        public int Executions { get; set; }
        public int Played { get; set; }

        //Dates
        public DateTime Created { get; set; }
        public DateTime LastPlayed { get; set; }

    }
}