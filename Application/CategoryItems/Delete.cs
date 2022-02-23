using System;

using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;

namespace Application.CategoryItems
{
    public class Delete
    {
         public class Command: IRequest<Result<Unit>>{
            public int Id {get;set;}
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
                var category = await _context.CategoryItems.FindAsync(request.Id);
             
                _context.CategoryItems.Remove(category);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Category");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}