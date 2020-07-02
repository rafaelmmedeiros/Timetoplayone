using AutoMapper;
using Domain;

namespace Application.Grupos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Grupo, GrupoDto>();
        }
    }
}