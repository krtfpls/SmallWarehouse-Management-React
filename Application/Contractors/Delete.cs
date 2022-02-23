using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;

namespace Application.Contractors
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
                var item = await _context.Contractors.FindAsync(request.Id);
             
                
                _context.Contractors.Remove(item);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to remove Contractor");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}