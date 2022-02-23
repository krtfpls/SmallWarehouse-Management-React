using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;

namespace Application.Products
{
    public class Delete
    {
        public class Command: IRequest<Result<Unit>>{
            public Guid Id {get;set;}
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
                var item = await _context.Products.FindAsync(request.Id);

                //if (item.UserId != user.Id) return Result<Unit>.Failure("Ten Item nie jest twój");
                             
                _context.Products.Remove(item);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete Product");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}