using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
