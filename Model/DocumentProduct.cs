using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Model
{
    public class DocumentProduct
    {
        public Guid DocumentId {get;set;}        
        public Document Document {get;set;}

        public Guid ProductId {get;set;}
        public Product Product {get;set;}
        
        public int Quantity {get ;  set ; }

    }
}