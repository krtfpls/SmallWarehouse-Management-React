using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Model
{
    public class Contractor
    {
        public Guid Id {get;set;}
        public string Name {get; set;}
        public bool Supplier {get;set;}
        public bool Customer {get;set;}
        public string Info {get;set;}
        public string Street {get;set;}
        public string StreetNumber {get;set;}
        public string City {get;set;}
        public string TaxNumber {get;set;}

        [JsonIgnore]
        public IEnumerable<Document> Documents {get;set;}
    }
}