using System;

namespace Application.AppTrainer.Lores.Others {
    public class TomeLoresDto {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Active { get; set; }
        public int Position { get; set; }

        // COMPUTED
        public int TotalEtudes { get; set; }
        public int TotalTime { get; set; }
    }
}