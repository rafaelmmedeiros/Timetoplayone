using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddAppUserBio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estudos");

            migrationBuilder.DropTable(
                name: "Values");

            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "Estudos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BpmInicial = table.Column<int>(type: "INTEGER", nullable: false),
                    DataCriacao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    Dificuldade = table.Column<int>(type: "INTEGER", nullable: false),
                    Fluencia = table.Column<int>(type: "INTEGER", nullable: false),
                    Minutos = table.Column<int>(type: "INTEGER", nullable: false),
                    Origem = table.Column<string>(type: "TEXT", nullable: true),
                    PrimeiroTreino = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Proposito = table.Column<int>(type: "INTEGER", nullable: false),
                    Tecnica = table.Column<string>(type: "TEXT", nullable: true),
                    TempoPraticado = table.Column<int>(type: "INTEGER", nullable: false),
                    Titulo = table.Column<string>(type: "TEXT", nullable: true),
                    UltimoTreino = table.Column<DateTime>(type: "TEXT", nullable: false),
                    VezesPraticado = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Idade = table.Column<int>(type: "INTEGER", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Sobrenome = table.Column<string>(type: "TEXT", nullable: true)
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
    }
}
