using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Model;

namespace Application.Contractors
{
    public class ContractorsValidator: AbstractValidator<Contractor>
    {
         public ContractorsValidator(){
             
                RuleFor(x=> x.Name).NotEmpty().MaximumLength(100);
                RuleFor(x=> x.TaxNumber).MaximumLength(30);
                RuleFor(x=> x.Street).NotEmpty().MaximumLength(100);
                RuleFor(x=> x.StreetNumber).NotEmpty().MaximumLength(20);
                RuleFor(x=> x.City).NotEmpty().MaximumLength(100);
                RuleFor(x=> x.Info).MaximumLength(300);
            }
    }
}