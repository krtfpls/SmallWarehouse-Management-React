using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using FluentValidation;
using MediatR;
using Model;

namespace Application.Contractors
{
    public class Create
    {  public class Command : IRequest<Result<Unit>>{
            public Contractor contractor {get;set;} 
        }

        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.contractor).SetValidator(new ContractorsValidator());
            }
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
                _context.Contractors.Add(request.contractor);
                var result= await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Cannot to create new Contractor");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}