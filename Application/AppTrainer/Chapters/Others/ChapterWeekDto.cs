using System;

namespace Application.AppTrainer.Chapters.Others {
    public class ChapterWeekDto {
        public Guid Id { get; set; }
        public DateTime Day { get; set; }
        public int TotalTime { get; set; }
        public double DifferenceToBestDay { get; set; }
    }
}