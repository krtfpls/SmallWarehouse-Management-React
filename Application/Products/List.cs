using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Data;

namespace Application.Products
{
    public class List
    {
        public class Query: IRequest<Result<PagedList<ProductDTO>>> {
            public ProductParams Params { get; set; }   
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProductDTO>>>
        {
            DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context= context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<ProductDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {                 
                    var query = _context.Products
                    .OrderBy(d => d.Name)
                    .Include(u => u.User)
                       .Where(u => u.User.UserName == _userAccessor.GetUsername())
                    .ProjectTo<ProductDTO>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.Params.CategoryName != null){
                    query = query.Where(c => c.Category== request.Params.CategoryName);
                }
                 
                 return Result<PagedList<ProductDTO>>.Success(
                     await PagedList<ProductDTO>.CreateAysnc(query, request.Params.PageNumber, request.Params.PageSize)
                 );
            }
        }
    }
}