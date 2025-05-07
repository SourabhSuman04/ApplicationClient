using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;
using Application.Domain.IRepository;
using Dapper;

namespace Application.DataAccess.Repository
{
    public class UserLoginRepository : IUserloginRepository
    {
        private readonly IDbConnection _dbConnection;

        public UserLoginRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<Users> Login(Users user)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("username", user.username);
                param.Add("password", user.password);
               
                return await _dbConnection.QueryFirstOrDefaultAsync<Users>("UserLoginAuth", param);
            }
            catch (Exception ex)
            {
                // Handle exception
                throw;
            }
        }

        public async Task<Users> forgotpassword(Users user)
        {

            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("username", user.username);
                param.Add("@newpassword", user.password);

                return await _dbConnection.QueryFirstOrDefaultAsync<Users>("UserForgotPassword", param);
            }
            catch(Exception e)
            {
                throw;
            }

        }

        public async Task<Users> Register(Users user)
        {
            try
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("UserName", user.username);
                dynamicParameters.Add("Email", user.email);
                dynamicParameters.Add("Password", user.password);
                dynamicParameters.Add("Role", user.role);


                return await _dbConnection.QueryFirstOrDefaultAsync<Users>("UserSignup", dynamicParameters);
            } 
            catch (Exception ex)
            {
                // Handle exception
                throw;
            }
        }

        public async Task<Users> GetUserByUsernameAsync(string username)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("username", username);

                return await _dbConnection.QueryFirstOrDefaultAsync<Users>("GetUserByUsername", param);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
