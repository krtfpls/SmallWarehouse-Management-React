using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Contractors;
using Application.Core;
using Application.Interfaces;
using Application.Products;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Documents
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<DocumentsDto>>>
        {
            public DocumentParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<DocumentsDto>>>
        {
            DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<DocumentsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Documents
                            .Where(d => d.Date >= request.Params.FromDate)
                            .Include(u => u.User)
                            .Include(c => c.Contractor)
                            .Include(s => s.Products)
                            .ThenInclude(i => i.Product)
                            .ThenInclude(c => c.Category)
                            .Where(u => u.User.UserName == _userAccessor.GetUsername())
                            .OrderByDescending(d => d.Date)
                            .AsQueryable();

                if (request.Params.isIncome != null){
                    if (request.Params.isIncome==true)
                    query= query.Where(x => x.IsIncome == true);
                    else if (request.Params.isIncome== false){
                        query = query.Where(x=> x.IsIncome == false);
                    }
                }

                if (request.Params.ContractorID != null){
                    query = query.Where(x => x.Contractor.Id == request.Params.ContractorID);
                }

                if (request.Params.ToDate != null){
                    query= query.Where(x => x.Date <= request.Params.ToDate);
                }

                int count = query.Count();

                var _documents= await PagedList<Document>.CreateAysnc(query, request.Params.PageNumber, request.Params.PageSize);

                var _documentsToReturn = new List<DocumentsDto>();
                    
                foreach (var doc in _documents){
                 
                    List<ProductDTO> items = new List<ProductDTO>();
                    
                        foreach (var item in doc.Products)
                        {
                            ProductDTO test = new ProductDTO();
                            
                                test.Id= item.Product.Id;
                                test.Name= item.Product.Name;
                                test.SerialNumber= item.Product.SerialNumber;
                                test.PriceNetto= item.Product.PriceNetto;
                                test.Quantity= item.Quantity;
                                test.MinLimit= item.Product.MinLimit;
                                test.Description= item.Product.Description;
                                test.Category= item.Product.Category.Name;
                               
                                items.Add( test);

                        }
                    _documentsToReturn.Add( 
                        new DocumentsDto{
                            Id= doc.Id,
                            Name= doc.Name,
                            Number= doc.Number,
                            Date= doc.Date,
                            Contractor= _mapper.Map<ContractorDto>(doc.Contractor),
                            Products= items
                        }
                    );
                }

                PagedList<DocumentsDto> pagedList = new PagedList<DocumentsDto>(_documentsToReturn, count, 
                            request.Params.PageNumber, request.Params.PageSize );

                return Result<PagedList<DocumentsDto>>.Success(pagedList);
                
            }


        }
    }
}