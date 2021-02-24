using System;

namespace Domain.AppTrainer {
    public class Chapter {
        public Guid Id { get; set; }
        public DateTime Day { get; set; }
        public int TotalTime { get; set; }
        public int TotalEtudes { get; set; }
        public int Objective { get; set; }
        public string AppUserId { get; set; }
    }
}