using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InicialMigration : Migration
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
                    Tecnica = table.Column<string>(nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(nullable: true),
                    Sobrenome = table.Column<string>(nullable: true),
                    Idade = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 1, 52, "João", "Silva" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 2, 22, "Maria", "Hoffman" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 3, 23, "Pedro", "Souza" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 4, 32, "José", "Correa" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 5, 14, "Akira", "Duarte" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 6, 21, "Brunna", "Pereira" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Idade", "Nome", "Sobrenome" },
                values: new object[] { 7, 26, "Natália", "Pirassununga" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estudos");

            migrationBuilder.DropTable(
                name: "Values");
        }
    }
}
