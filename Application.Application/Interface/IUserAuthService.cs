using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Application.DAO;
using Application.Domain.Entities;
using Demo.Application.Helper;

namespace Application.Application.Interface
{
    public interface IUserAuthService
    {
        Task<ApiResponse<UserLoginDAO>> Login(Users user);
        Task<ApiResponse<Users>> Register(Users user);
        Task<ApiResponse<UserLoginDAO>> forgotpassword(Users user);
    }
}
