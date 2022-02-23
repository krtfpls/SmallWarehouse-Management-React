using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;
using Model;

namespace Application.CategoryItems
{
    public class Create
    {  public class Command : IRequest<Result<Unit>>{
            public CategoryItem Item {get;set;} 
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.CategoryItems.Add(request.Item);
                var result=await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to create Category");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}