using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;

namespace Application.Domain.IRepository
{
    public interface IUserloginRepository
    {
        Task<Users> Login(Users user);
        Task<Users> Register(Users user);

        Task<Users> GetUserByUsernameAsync(string username);
        Task<Users> forgotpassword(Users user);
    }
}
