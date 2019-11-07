using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class EstudoEntidadeAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estudos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Titulo = table.Column<string>(nullable: true),
                    Origem = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(nullable: true),
                    BpmInicial = table.Column<int>(nullable: false),
                    Compassos = table.Column<int>(nullable: false),
                    Tecnica = table.Column<string>(nullable: true),
                    SubTecnica = table.Column<string>(nullable: true),
                    Dificuldade = table.Column<int>(nullable: false),
                    Proposito = table.Column<int>(nullable: false),
                    Fluencia = table.Column<int>(nullable: false),
                    Minutos = table.Column<int>(nullable: false),
                    VezesPraticado = table.Column<int>(nullable: false),
                    TempoPraticado = table.Column<int>(nullable: false),
                    DataCriacao = table.Column<DateTime>(nullable: false),
                    PrimeiroTreino = table.Column<DateTime>(nullable: false),
                    UltimoTreino = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estudos");
        }
    }
}
