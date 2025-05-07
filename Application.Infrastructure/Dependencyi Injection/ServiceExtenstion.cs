using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DataAccess.Repository;
using Application.Domain.IRepository;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Application.Application;
using Application.Application.Service;
using Application.Application.Interface;
using Demo.Application.JWT;
using Microsoft.AspNetCore.Identity;
using Application.Domain.Entities;
using Application.Application.Helper;



namespace Application.Infrastructure.Dependencyi_Injection
{
    public static class ServiceExtenstion
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<PasswordService,PasswordService>();  
            services.AddScoped<PasswordHasher<Users>>();
            services.AddScoped<IUnitWiseService, UnitWiseService>();
            services.AddScoped<IUserDetailsService, UsersDetailsService>();
            services.AddScoped<IUserAuthService, UserAuthService>();
            return services;
        }


        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
          
            services.AddScoped<JWTAuthManager, JWTAuthManager>();
            services.AddScoped<IUnitWiseRepository, UnitWiseRepository>();
            services.AddScoped<IUsersDetailsRepository,UserDetailsRepository>();
            services.AddScoped<IUserloginRepository, UserLoginRepository>();
            services.AddScoped<IDbConnection>(sp =>
              new SqlConnection(configuration.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
