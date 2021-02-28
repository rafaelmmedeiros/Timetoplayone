using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Collections.Others {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Etude, EtudeEditDto>();
        }
    }

}