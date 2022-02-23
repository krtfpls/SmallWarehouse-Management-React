using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using FluentValidation.AspNetCore;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using System.Linq;

namespace Application.Documents
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public DocumentsDto Document { get; set; }
            public bool IsIncome { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.Document).SetValidator(new DocumentValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            // private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;

                _userAccessor = userAccessor;
            }

            // TO DO check is doc number exist? If yes, prompt for new number accapt or discard
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Document checkDoc = await _context.Documents
                    .AsNoTracking()
                    .SingleOrDefaultAsync(id => id.Id == request.Document.Id);

                if (checkDoc != null)
                {
                    return Result<Unit>.Failure("Ten dokument już istnieje");
                }
                else
                {
                    var user = await _context.Users
                            .FirstOrDefaultAsync(x =>
                                x.UserName == _userAccessor.GetUsername());

                    if (user == null) return null;

                    Contractor contractor = await _context.Contractors
                       // .AsNoTracking() Nie dodawaj! blad o unique coinstraint przy i
                        .SingleOrDefaultAsync(x => x.Id == request.Document.Contractor.Id);

                    if (contractor == null)
                    {
                        return Result<Unit>.Failure("Brak dostawcy");
                        // contractor = new Contractor{
                        //     Name= request.Document.Contractor.Name,
                        //     Supplier= request.Document.Contractor.Supplier,
                        //     Customer= request.Document.Contractor.Customer,
                        //     Info= request.Document.Contractor.Info,
                        //     Street= request.Document.Contractor.Street,
                        //     StreetNumber= request.Document.Contractor.StreetNumber,
                        //     City= request.Document.Contractor.City,
                        //     TaxNumber= request.Document.Contractor.TaxNumber,

                        // };
                    }

                     checkDoc = new Document()
                    {
                        Date = request.Document.Date,
                        IsIncome = request.IsIncome,
                        Name = request.Document.Name,
                        Number = request.Document.Number,
                        User = user,
                        Contractor = contractor,
                    };

                    List<DocumentProduct> Products = new List<DocumentProduct>();

                    foreach (var requestItem in request.Document.Products)
                    {

                        var _tempItem = await _context.Products
                                .AsNoTracking()
                               .Where(u => u.User.UserName== _userAccessor.GetUsername())
                                .SingleOrDefaultAsync(i => i.Id == requestItem.Id);

                        bool itemToUpdate = false;

                        if (_tempItem == null) _tempItem = new Product();
                        else {
                            if (_tempItem.UserId != user.Id) return Result<Unit>.Failure("Ten Item nie jest twój");
                            itemToUpdate = true;}

                        var category = await _context.CategoryItems
                                .SingleOrDefaultAsync(x => x.Name == requestItem.Category);

                        if (category == null) category = new CategoryItem() { Name = requestItem.Category };

                        switch (checkDoc.IsIncome)
                        {
                            case true:
                                _tempItem = ProductMapper.MapFromDto(_tempItem, requestItem, user,
                                                            category, _tempItem.AddItem(requestItem.Quantity));
                                break;
                            case false:
                                _tempItem = ProductMapper.MapFromDto(_tempItem, requestItem, user,
                                                            category, _tempItem.RemoveItem(requestItem.Quantity));
                                break;

                            default:
                                throw new Exception("Błąd typu dokumentu");
                                //return Result<Unit>.Failure("Błąd typu dokumentu"); //zwraca pusty obiekt
                              //  break;
                        }

                        if (itemToUpdate)
                            _context.Products.Update(_tempItem);


                        Products.Add(new DocumentProduct {
                            Product=_tempItem,
                            Quantity= requestItem.Quantity
                        });
                    };

                    checkDoc.Products = Products;

                    _context.Add(checkDoc);

                    var result = await _context.SaveChangesAsync() > 0;
                    if (!result)
                        return Result<Unit>.Failure("Failed to create Document"); //zwraca pusty obiekt
                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}