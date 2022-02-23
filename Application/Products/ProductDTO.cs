using System;
using System.Collections.Generic;
using Application.Profiles;
using Model;

namespace Application.Products
{
   public class ProductDTO
    {   
       public Guid Id { get; set; }
        public string Name { get; set; }
        public string SerialNumber { get; set; }
        public float PriceNetto {get;set;}
        public int Quantity {get;set;}
        public int MinLimit {get;set;}
        public string Description { get; set; }
        public string Category {get;set;}

    }
}