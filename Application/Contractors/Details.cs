using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Contractors
{
    public class Details
    {
        public class Query: IRequest<Result<Contractor>>{
            public Guid Id {get;set;}
        }

        public class Handler : IRequestHandler<Query, Result<Contractor>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Contractor>> Handle(Query request, CancellationToken cancellationToken)
            {
                   return Result<Contractor>.Success(await _context.Contractors.SingleOrDefaultAsync(x => x.Id == request.Id));
             
                
            }
        }
    }
}