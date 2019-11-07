using System;

namespace Domain
{
    public class Treino
    {
        public DateTime Inicio { get; set; }
        public DateTime Fim { get; set; }

        // Deve ser garantido que a exclusão de um ESTUDo não detone com as estatisticas e treinos.
        //Treino devem ser totalmente idependendetes, para quando ocorer exlusão de um Estudo não haver redimencionamento de estatisticas.
    }

}