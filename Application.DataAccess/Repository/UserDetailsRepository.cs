using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Numerics;
using System.Reflection.Emit;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;
using Application.Domain.IRepository;
using Dapper;

namespace Application.DataAccess.Repository
{
    public class UserDetailsRepository : IUsersDetailsRepository
    {
        public readonly IDbConnection dbconnection;

        public UserDetailsRepository(IDbConnection dbconnection)
        {
            this.dbconnection = dbconnection;
        }


        public async Task<UsersDetails> Addorupdate(UsersDetails usersDetails, Guid guid)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                
                param.Add("firstName", usersDetails.firstName);
                param.Add("lastName",usersDetails.lastName);
                param.Add("email",usersDetails.email);
                param.Add("phone",usersDetails.phone);
                param.Add("dateOfBirth",usersDetails.dateOfBirth);
                param.Add("gender",usersDetails.gender);
                param.Add("address",usersDetails.address);
                param.Add("city",usersDetails.city);
                param.Add("state",usersDetails.state);
                param.Add("zipCode",usersDetails.zipCode);
                param.Add("country",usersDetails.country);
                param.Add("role",usersDetails.role);
                param.Add("status",usersDetails.status);
                //param.Add("createdDate",usersDetails.crae);
                //param.Add("lastLogin",usersDetails.lastLogin);
                //param.Add("avatar",usersDetails.avatar);
                param.Add("ImageId", guid);
                return await this.dbconnection.QueryFirstOrDefaultAsync<UsersDetails>("AddOrUpdateUser", param); 

            }catch(Exception e)
            {
                throw;
            }
        }

        public Task<UsersDetails> deleteUser(int id)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("id", id);
                return dbconnection.QueryFirstOrDefaultAsync<UsersDetails>("deleteUserdetails", param);

            }catch(Exception e)
            {
                throw;
            }
        }

        public async Task<UsersDetails> GetUserDeatilSById(int id)
        {
            try
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("id", id);
                return await this.dbconnection.QueryFirstOrDefaultAsync<UsersDetails>("GetAllUsersbyId", param);

            }
            catch(Exception e)
            {
                throw;
            }
        }

        public async Task<IEnumerable<UsersDetails>> GetUsersDetails()
        {
            try
            {
                var result = await dbconnection.QueryAsync<UsersDetails>("GetAllUsers");

                if(result!=null)
                {
                    Console.WriteLine(result);
                }

                return result;
            }catch(Exception e)
            {
                throw;
            }
        }
    }
}
