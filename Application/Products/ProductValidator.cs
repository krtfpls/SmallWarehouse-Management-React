using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Products
{
    public class ProductValidator: AbstractValidator<ProductDTO>
    {
        public ProductValidator(){

            RuleFor(x=> x.Name).NotEmpty().MaximumLength(50);
            RuleFor(x=> x.Category).NotEmpty().MaximumLength(50);
            RuleFor(x=> x.Quantity).NotEmpty().GreaterThan(0).LessThan(10000); //.LessThan(2).When(x => x.SerialNumber != null);
            RuleFor(x=> x.SerialNumber).MaximumLength(50);
            RuleFor(x=> x.PriceNetto).GreaterThanOrEqualTo(0).LessThan(50000);
            RuleFor(x=> x.MinLimit).GreaterThanOrEqualTo(0).LessThan(1000);
            RuleFor(x=> x.Description).MaximumLength(300);
        }
        
    }
}