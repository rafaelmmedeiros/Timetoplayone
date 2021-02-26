using AutoMapper;
using Domain.AppTrainer;

namespace Application.AppTrainer.Chapters.Others {
    public class MappingProfile : Profile {
        public MappingProfile() {
            CreateMap<Chapter, ChapterTodayDto>();
        }
    }
}