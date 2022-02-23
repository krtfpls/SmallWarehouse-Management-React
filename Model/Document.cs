using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Model
{
    public class Document
    {
        public Guid Id {get;set;}
        public string Name {get;set;}
        public string Number {get;set;}
        public DateTime Date {get;set;}
        public Contractor Contractor {get;set;}
        public ICollection<DocumentProduct> Products {get; set;}  
        
        [JsonIgnore]
        public User User {get;set;}
        [JsonIgnore]
        public bool IsIncome {get; set;}
    }
}