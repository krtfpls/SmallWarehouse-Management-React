using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Security
{
    public class IsHostRequirement: IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        { 
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var _userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (_userId == null) return Task.CompletedTask;
                    
                var ProductId = Guid.Parse(_httpContextAccessor.HttpContext?.Request
                            .RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

                // var user = _dbContext.Users
                // .AsNoTracking()
                // .SingleOrDefaultAsync(u => u.Id == userId)
                // .Result;
              
                var Product = _dbContext.Products
                .Include(u => u.User)
                .AsNoTracking()
                .Where(u => u.UserId == _userId)
                .SingleOrDefaultAsync(s => s.Id == ProductId)
                .Result;

                   if (Product == null) return Task.CompletedTask;

                    context.Succeed(requirement);

                return Task.CompletedTask;
        }
    }

}