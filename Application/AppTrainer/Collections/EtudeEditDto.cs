using System;

namespace Application.AppTrainer.Collections
{
    public class EtudeEditDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Tome { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }

    }
}