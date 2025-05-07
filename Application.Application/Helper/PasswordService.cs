using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.Application.Helper
{
    public class PasswordService
    {

        private readonly PasswordHasher<Users> _passwordHasher;

        public PasswordService(PasswordHasher<Users> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

        public string HashPassword(Users user,string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public PasswordVerificationResult VerifyPassword(Users user, string hashedPassword, string providedPassword)
        {
            return _passwordHasher.VerifyHashedPassword(user, hashedPassword, providedPassword);
        }
    }
}
