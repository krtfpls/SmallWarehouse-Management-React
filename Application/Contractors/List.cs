using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Contractors
{
    public class List
    {
        public class Query: IRequest<Result<List<ContractorDto>>> {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<ContractorDto>>>
        {
            DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context= context;
                _mapper = mapper;
            }

            public async Task<Result<List<ContractorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contractorList = await _context.Contractors
                    .AsNoTracking()
                    .ProjectTo<ContractorDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                 return Result<List<ContractorDto>>.Success(contractorList);
         
            }
        }
    }
}