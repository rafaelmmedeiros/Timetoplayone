using System.Collections.Generic;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections.Others
{
    public class UserCollection
    {
        public ICollection<EtudeDto> Etudes { get; set; }
    }
}