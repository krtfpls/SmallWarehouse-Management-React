using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Products;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Documents
{
    public class Details
    {
        public class Query : IRequest<Result<DocumentsDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<DocumentsDto>>
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

            public async Task<Result<DocumentsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var _document = await _context.Documents
                                .Include(contractor => contractor.Contractor)
                                .Include(u => u.User)
                                .Where(u => u.User.UserName == _userAccessor.GetUsername())
                                .Include(items => items.Products)
                                .ThenInclude(x => x.Product)
                                .ThenInclude(c => c.Category)
                                .SingleOrDefaultAsync(x => x.Id == request.Id);


                var _documentToRespond = _mapper.Map<DocumentsDto>(_document);

                return Result<DocumentsDto>.Success(_documentToRespond);
            }
        }
    }
}