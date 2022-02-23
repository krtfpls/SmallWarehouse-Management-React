using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class userForname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserForname",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserForname",
                table: "AspNetUsers");
        }
    }
}
