using System;

namespace Application.AppTrainer.Lores.Others
{
    public class TomeListDto
    {
        public Guid Id { get; set; }
        public int Position { get; set; }
        public string Title { get; set; }
        public int TotalEtudes { get; set; }
        public string AppUserId { get; set; }
    }
}