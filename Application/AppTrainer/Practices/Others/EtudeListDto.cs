using System;

namespace Application.AppTrainer.Practices.Others
{
    public class EtudeListDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public string Tome { get; set; }
        public int Time { get; set; }
        public string Description { get; set; }

        //  Dates
        public DateTime LastPlayed { get; set; }

        //  RELATIONS
        // public string AppUserId { get; set; }
    }
}