using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;
using Model;

namespace Application.CategoryItems
{
    public class Details
    {
          public class Query: IRequest<Result<CategoryItem>>{
            public int Id {get;set;}
        }

        public class Handler : IRequestHandler<Query, Result<CategoryItem>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<CategoryItem>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<CategoryItem>.Success(await _context.CategoryItems.FindAsync(request.Id));
            }
        }
    }
}