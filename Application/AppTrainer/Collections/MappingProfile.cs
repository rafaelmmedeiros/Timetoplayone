using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Etude, EtudeEditDto>();
        }
    }
}