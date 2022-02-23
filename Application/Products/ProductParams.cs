using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Products
{
    public class ProductParams: PagingParams
    {
        public string CategoryName {get;set;}
  
    }
}