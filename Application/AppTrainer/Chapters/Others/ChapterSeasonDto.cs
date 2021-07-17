using System;

namespace Application.AppTrainer.Chapters.Others {
    public class ChapterSeasonDto {
        public Guid Id { get; set; }
        public DateTime DayStart { get; set; }
        public DateTime DayEnd { get; set; }
        public int TotalTime { get; set; }
        public double DifferenceToBestDay { get; set; }
    }
}