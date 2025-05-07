using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Application.Dto;
using Application.Domain.Entities;
using Demo.Application.Helper;
using Microsoft.AspNetCore.Http;

namespace Application.Application.Interface
{
    public interface IUserDetailsService
    {
        public Task<ApiResponse<List<Usersdetailsdto>>> GetUsersDetails();
        public Task<ApiResponse<Usersdetailsdto>> getUserById(int id);
        public Task<ApiResponse<UsersDetails>> AddorUpdate(Usersdetailsdto user,Guid guid);

        public Task<ApiResponse<UsersDetails>> deleteUsersDetails(int id);

    }
}
