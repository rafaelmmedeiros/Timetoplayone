using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Lores.Others
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Tome, TomeLoresDto>();
        }
    }
}