using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.CategoryItems
{
    public class List
    {
               public class Query: IRequest<Result<List<CategoryItem>>> {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<CategoryItem>>>
        {
            DataContext _context;

            public Handler(DataContext context)
            {
                _context= context;
            }

            public async Task<Result<List<CategoryItem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                 return Result<List<CategoryItem>>.Success(await _context.CategoryItems.ToListAsync(cancellationToken));
            }
        }
    }
}