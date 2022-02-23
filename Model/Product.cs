using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Model
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public float PriceNetto {get;set;}
        public int Quantity {get; private set;}
        public int MinLimit {get;set;}
        public string Description { get; set; }
        public CategoryItem Category {get;set;}

        [JsonIgnore]
        public ICollection<DocumentProduct> Documents {get;set;} 
        [JsonIgnore]
        public string UserId {get;set;}
        [JsonIgnore]
        public User User {get;set;} 


        public int AddItem(int quantity){
           
            return this.Quantity+=quantity;;
        }

        public int RemoveItem(int quantity){
          
            return this.Quantity-=quantity;
        }
    }
}