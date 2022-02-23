using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Model
{
    public class CategoryItem
    {   
             public int Id { get; set; }
             public string Name { get; set; }
             
             [JsonIgnore]
              public string PhotoPath {get; set;}
             [JsonIgnore]
              public IEnumerable<Product> Products {get;set;}
    }
}