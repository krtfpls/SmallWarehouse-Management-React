using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Application.Contractors
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>{
           public Contractor contractor {get;set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
              private readonly IMapper _mapper;
             public Handler(DataContext context, IMapper mapper)           
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            { 
                var _contractor = await _context.Contractors.FirstAsync(s => s.Id == request.contractor.Id);
                
                _mapper.Map(request.contractor, _contractor);

                    var result= await _context.SaveChangesAsync() > 0 ;

                     if (!result) return Result<Unit>.Failure("Failed to update Contractor");

                    return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}