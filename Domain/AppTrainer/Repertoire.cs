using System;

namespace Domain.AppTrainer
{
    public class Repertoire
    {
        public Guid Id { get; set; }
        public int Position { get; set; }
        public string Title { get; set; }
        public string AppUserId { get; set; }

    }
}