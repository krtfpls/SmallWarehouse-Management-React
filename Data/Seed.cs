using System.Collections.Generic;
using System;
using System.Linq;
using Model;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {

            if (!userManager.Users.Any() && !context.Products.Any()){
                var users = new List<User>{
                    new User{DisplayName="Bob", UserName="bob", Email="bob@test.com"},
                    new User{DisplayName="Tom", UserName="tom", Email="tom@test.com"},
                    new User{DisplayName="Test", UserName="test", Email="test@test.com"}
                };

                foreach (var user in users){
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.CategoryItems.Any())
            {
                // Grupy
                var groups = new List<CategoryItem>{
                    //0
                    new CategoryItem{
                        Name="Drukarka Fiskalna"
                    },
                    //1
                    new CategoryItem{
                        Name="Dysk SSD"
                    },
                    //2
                    new CategoryItem{
                        Name="POS"
                    },
                    //3
                    new CategoryItem{
                        Name="Przewód USB"
                    },
                    //4
                    new CategoryItem{
                        Name="Pamięć RAM"
                    },
                    //5
                    new CategoryItem{
                        Name="Switch"
                    },
                    //6
                    new CategoryItem{
                        Name="Szafa Rack"
                    },
                    //7
                    new CategoryItem{
                        Name="Zasilacz"
                    },
                    //8
                    new CategoryItem{
                        Name="Karta SD"
                    },
                    //9
                    new CategoryItem{
                        Name="Mechanizm Drukujący"
                    },
                    //10
                    new CategoryItem{
                        Name="Pendrive"
                    },
                    //11
                    new CategoryItem{
                        Name="Zestaw Serwisowy"
                    },
                    //12
                    new CategoryItem{
                        Name="Patchcord"
                    },
                    //13
                    new CategoryItem{
                        Name="Gniazdo RJ45"
                    }
                };
                // Kontrahenci
                var contartors = new Contractor
                {
                    Name = "Eurocash Krosno",
                    Info = "Centrala",
                    Supplier= true,
                    Customer= true,
                    Street = "Przemysłowa",
                    StreetNumber = "34",
                    City = "Chorkówka",
                    TaxNumber = "7791906082"
                };

                User userTemp= await userManager.FindByNameAsync("test");

                Random random= new Random();

                List<DocumentProduct> ProductList1 = new List<DocumentProduct>(){
                                new DocumentProduct{
                                Product= new Product {
                                                    Name = "Elzab Mera",
                                                    SerialNumber= "474202873",
                                                    PriceNetto= 2399,
                                                    MinLimit=1,
                                                    Description = "drukarka testowa",
                                                    Category =groups[0],
                                                    //Quantity=1,
                                                    User= userTemp
                                }},

                                  new DocumentProduct{
                                Product= new Product {
                                         Name =  "4GB DDR4",
                                                    SerialNumber= "",
                                                    PriceNetto= 100,
                                                    MinLimit=1,
                                                    Description = "pamięć testowa",
                                                    Category =groups[4],
                                                    //Quantity=1,
                                                     User= userTemp
                                   } },
                                new DocumentProduct{
                                Product= new Product {
                                                    Name = "zasilacz Elzab P10",
                                                    SerialNumber= "brak",
                                                    PriceNetto= 109,
                                                    MinLimit=1,
                                                    Description = "zasilacz testowy",
                                                    Category =groups[7],
                                                    //   Quantity=1,
                                                     User= userTemp
                                 } },
                                new DocumentProduct{
                                Product= new Product {
                                                    Name = "gniazdo pojedyncze",
                                                    SerialNumber= "",
                                                    PriceNetto= 120,
                                                    MinLimit=20,
                                                    Description = "gniazdo testowe",
                                                    Category =groups[13],
                                                  //      Quantity=20,
                                                    User= userTemp
                                }},
                                
                            };

                               foreach (var item in ProductList1)
                            {
                                item.Quantity=(random.Next(1,20));
                                item.Product.AddItem(item.Quantity);
                            }


                List<DocumentProduct> ProductList2 = new List<DocumentProduct>(){
                                new DocumentProduct{
                                Product= new Product {
                                                    Name = "gniazdo podwojne",
                                                    SerialNumber= "",
                                                    PriceNetto= 20,
                                                    MinLimit=20,
                                                    Description = "gniazdo testowe",
                                                    Category =groups[13],

                                                   // Quantity=30,
                                                   User= userTemp
                                     }},
                              new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 2m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                   // Quantity=20,
                                                    User= userTemp
                               } },
                                
                            };

                            foreach (var item in ProductList2)
                            {
                           item.Quantity=(random.Next(1,20));
                                item.Product.AddItem(item.Quantity);
                            
                            }

                List<DocumentProduct> ProductList3 = new List<DocumentProduct>(){

                        new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 0,25m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                  //  Quantity=25,
                                                    User= userTemp
                                     }
                                     },

                        new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 3m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                   // Quantity=13,
                                                    User= userTemp
                                     }
                        },

                        new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 5m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                  //  Quantity=1,
                                                    User= userTemp
                                     }
                        },

                        new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 1m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                  //  Quantity=3,
                                                     User= userTemp
                                     }},

                        new DocumentProduct{
                                Product= new Product {
                                                    Name =  "patchcord 0,5m",
                                                    SerialNumber= "",
                                                    PriceNetto= 5,
                                                    MinLimit=20,
                                                    Description = "patchcord testowy",
                                                    Category =groups[12],
                                                   // Quantity=2,
                                                     User= userTemp
                                     }
                                     
                                }
                            };

                                   foreach (var item in ProductList3)
                            {
                              item.Quantity=(random.Next(1,20));
                                item.Product.AddItem(item.Quantity);
                            }

                
                List<Document> documents= new List<Document>();

                documents.Add(new Document{
                            Name= "PZ",
                            Number= "1/2021",
                            Date = DateTime.Now.AddDays(-3),
                            Contractor= contartors,
                            IsIncome=true,
                            User= context.Users.FirstOrDefault(x => x.UserName=="test"),
                            Products= ProductList1
                            });
                        
                documents.Add(new Document{
                              Name= "PZ",
                            Number= "2/2021",
                            Date = DateTime.Now.AddDays(-2),
                            Contractor= contartors,
                             IsIncome=true,
                            User= context.Users.FirstOrDefault(x => x.UserName=="test"),
                            Products=ProductList2
                            });

                documents.Add(new Document{
                              Name= "PZ",
                            Number= "3/2021",
                            Date = DateTime.Now,
                            Contractor= contartors,
                             IsIncome=true,
                            User= context.Users.FirstOrDefault(x => x.UserName=="test"),
                            Products=ProductList3
                            });
                


                context.Contractors.Add(contartors);
                context.SaveChanges();
                context.CategoryItems.AddRange(groups);
                context.SaveChanges();

                context.Documents.AddRange(documents);
                context.SaveChanges();
            }

        }
    }
}