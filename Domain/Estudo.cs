using System;

namespace Domain
{
    public class Estudo
    {
        // Sistema
        public Guid Id { get; set; }

        // Desctitivo Textos
        public string Titulo { get; set; }
        public string Origem { get; set; }
        public string Descricao { get; set; }

        // Descritivo Musica
        public int BpmInicial { get; set; }

        // Qualificativos e Segregativos
        public string Tecnica { get; set; } // Arpejios, Escalas ...
        public int Dificuldade { get; set; } // 5 Niveis (1-5)
        public int Proposito { get; set; } // 1-Técnica Pura (Endurance), 2-Aplicação em Estrutras Musicais, 3-Vocabularios, 4-Musica
        public int Fluencia { get; set; } // 0 Aprendizado, 1 Manutencao

        // Treino
        public int Minutos { get; set; }

        // Disciplina
        public int VezesPraticado { get; set; } // Deve ser independewnte da Entidade TREINO
        public int TempoPraticado { get; set; } // Deve ser independewnte da Entidade TREINO

        // Praticas
        public DateTime DataCriacao { get; set; }
        public DateTime PrimeiroTreino { get; set; }
        public DateTime UltimoTreino { get; set; }
    }
}