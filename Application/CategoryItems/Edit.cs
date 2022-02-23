using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Data;
using MediatR;
using Model;

namespace Application.CategoryItems
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>{
            public CategoryItem EditItem {get;set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var category = await _context.CategoryItems.FindAsync(request.EditItem.Id);
                if (category ==null) return null;

                _mapper.Map(request.EditItem, category);
               // category.Name = request.EditItem.Name ?? category.Name; 
                
                    var result =  await _context.SaveChangesAsync() > 0;
                     if (!result) return Result<Unit>.Failure("Failed to update Category");
                    return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}