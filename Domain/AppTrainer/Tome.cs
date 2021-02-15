using System;

namespace Domain.AppTrainer
{
    public class Tome
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public int Position { get; set; }
        public int TotalEtudes { get; set; }
        public string AppUserId { get; set; }

    }
}