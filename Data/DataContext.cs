using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model;


namespace Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext (DbContextOptions options) : base (options)
        {
        }

        public DbSet<Product> Products {get;set;}
        public DbSet<CategoryItem> CategoryItems {get; set;}

        public DbSet<Contractor> Contractors {get;set;}
        public DbSet<Document> Documents {get;set;}
        
        public DbSet<DocumentProduct> DocumentsProducts { get; set; }
        public DbSet<Photo> Photos {get;set;}

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

            builder.Entity<DocumentProduct>(x => x.HasKey( ds => new {ds.DocumentId, ds.ProductId}));

            builder.Entity<DocumentProduct>()
                .HasOne(d => d.Document)
                .WithMany(s => s.Products)
                .HasForeignKey(ds => ds.DocumentId);
            
            builder.Entity<DocumentProduct>()
                .HasOne(s => s.Product)
                .WithMany(d => d.Documents)
                .HasForeignKey(ds => ds.ProductId);
        }
         
    }
}
