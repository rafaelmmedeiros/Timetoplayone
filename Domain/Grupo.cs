using System;

namespace Domain
{
    public class Grupo
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string SubTitulo { get; set; }
        public string Descricao { get; set; }
        public string Label { get; set; }
    }
}