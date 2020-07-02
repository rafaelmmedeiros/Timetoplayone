using System;
using Domain;

namespace Application.Grupos
{
    public class GrupoDto
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Descricao { get; set; }
        public string Label { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}