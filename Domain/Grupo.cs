using System;

namespace Domain
{
    public class Grupo
    {
        public Guid Id { get; set; }
        public String Titulo { get; set; }
        public String SubTitulo { get; set; }
        public String Descricao { get; set; }
        public String Label { get; set; }
    }
}