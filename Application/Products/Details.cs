using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Products
{
    public class Details
    {
        public class Query: IRequest<Result<ProductDTO>>{
            public Guid id {get;set;}
        }

        public class Handler : IRequestHandler<Query, Result<ProductDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<ProductDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item =  await _context.Products
                .Include(c => c.Category)
                .Include(u => u.User)
                .Where(u => u.User.UserName== _userAccessor.GetUsername())
                .ProjectTo<ProductDTO>(_mapper.ConfigurationProvider)
                .AsSplitQuery()
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == request.id);

                  //if (item. != ) return Result<Unit>.Failure("Ten Item nie jest twój");

                return Result<ProductDTO>.Success(item);
            }
        }
    }
}