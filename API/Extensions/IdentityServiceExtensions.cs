using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Model;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config){
            
            services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequireNonAlphanumeric= false;
                opt.Password.RequiredLength=8;
                opt.User.RequireUniqueEmail=true;
                opt.SignIn.RequireConfirmedEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>()
            .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                opt.TokenLifespan= TimeSpan.FromHours(3)
            );

            var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>{
                    opt.TokenValidationParameters= new TokenValidationParameters{
                        ValidateIssuerSigningKey= true,
                        IssuerSigningKey= key,
                        ValidateIssuer= false,
                        ValidateAudience= false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization(opt => 
                opt.AddPolicy("IsHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                }));

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            
            services.AddScoped<TokenService>(); 

            return services;
        }
    }
}