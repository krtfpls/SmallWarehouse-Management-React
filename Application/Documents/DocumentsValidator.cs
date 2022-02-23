using Model;
using FluentValidation;
using Application.Products;

namespace Application.Documents
{
        public class DocumentValidator: AbstractValidator<DocumentsDto>{
            public DocumentValidator(){
                RuleFor(x=> x.Contractor).NotEmpty();
                RuleFor(x=> x.Date).NotEmpty();
                RuleFor(x=> x.Name).NotEmpty().MaximumLength(100);
                RuleFor(x=> x.Number).NotEmpty().MaximumLength(100);
                RuleFor(x=> x.Products).NotEmpty();
            }
        }
}