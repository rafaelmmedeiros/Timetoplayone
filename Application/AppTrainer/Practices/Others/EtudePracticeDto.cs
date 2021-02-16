using System;

namespace Application.AppTrainer.Practices.Others
{
    public class EtudePracticeDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public int Fluence { get; set; }
        public string Tome { get; set; }
        public int TomePosition { get; set; }
        public bool TomeActive { get; set; }
        public int Time { get; set; }
        public string Description { get; set; }
        public DateTime LastPlayed { get; set; }
        public double Priority { get; set; }
    }
}