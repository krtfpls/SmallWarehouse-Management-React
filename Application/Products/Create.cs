using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;
using System;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
           public ProductDTO Item {get;set;} 
 
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Item).SetValidator(new ProductValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor= userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => 
                                x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;
                
                var category = await _context.CategoryItems.FirstOrDefaultAsync(x => 
                                x.Name == request.Item.Category);
                
                if (category == null)
                    category = new CategoryItem() {Name= request.Item.Category};
                    
                Product _item = new Product();
                
                _item = ProductMapper.MapFromDto(_item, request.Item, user, category, 0);
                
                _context.Products.Add(_item);
               
                var result= await _context.SaveChangesAsync() > 0;
                if (!result) 
                return Result<Unit>.Failure("Failed to create new Product");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}