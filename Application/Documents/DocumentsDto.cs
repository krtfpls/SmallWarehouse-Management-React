using System;
using System.Collections.Generic;
using Application.Contractors;
using Application.Products;
using Model;

namespace Application.Documents
{
    public class DocumentsDto
    {
        public Guid Id {get;set;}
        public string Name {get;set;}
        public string Number {get;set;}
        public DateTime Date {get;set;}
        public ContractorDto Contractor {get;set;}
        public ICollection<ProductDTO> Products {get; set;}  
        
    }
}