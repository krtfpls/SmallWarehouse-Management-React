using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>{
           public ProductDTO item {get;set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
              private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)           
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            { 
                var _findItem = await _context.Products
                .Include(c => c.Category)
                .Include(u => u.User)
                .AsSplitQuery()
                .FirstAsync(s => s.Id == request.item.Id);
                
                if (_findItem== null) return null;

                if (_findItem.User.UserName != _userAccessor.GetUsername()) return Result<Unit>.Failure("Ten Item nie jest twój");

                var _categoryItem = await _context.CategoryItems
                .FirstOrDefaultAsync(c => c.Name == request.item.Category);

                if (_categoryItem == null)  new CategoryItem(){Name= request.item.Category};

                    _findItem.Name= request.item.Name ?? _findItem.Name;
                    _findItem.SerialNumber= request.item.SerialNumber ?? _findItem.SerialNumber;
                    _findItem.MinLimit= request.item.MinLimit != 0 ? request.item.MinLimit : _findItem.MinLimit;
                    _findItem.Description= request.item.Description ?? _findItem.Description;
                
                    _findItem.PriceNetto= request.item.PriceNetto != 0 ? request.item.PriceNetto : _findItem.PriceNetto;
                    _findItem.Category= _categoryItem;
                    _findItem.AddItem(0);
                        // Not to change-> require new item to change this properties
                    _findItem.User=_findItem.User;
             
                    var result= await _context.SaveChangesAsync() > 0 ;

                     if (!result) return Result<Unit>.Failure("Failed to update Product");

                    return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}