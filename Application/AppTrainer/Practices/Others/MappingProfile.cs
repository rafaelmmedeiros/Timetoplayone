using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Practices.Others
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Etude, EtudePracticeDto>();
        }
    }
}