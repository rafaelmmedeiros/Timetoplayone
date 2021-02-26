using System;

namespace Application.AppTrainer.Chapters.Others {
    public class ChapterTodayDto {
        public Guid Id { get; set; }
        public DateTime Day { get; set; }
        public int TotalTime { get; set; }
        public int TotalEtudes { get; set; }
        public int Objective { get; set; }

    }
}