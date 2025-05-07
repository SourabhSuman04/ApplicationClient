using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;

namespace Application.Domain.IRepository
{
    public interface IUsersDetailsRepository
    {
        Task<IEnumerable<UsersDetails>> GetUsersDetails();

        Task<UsersDetails> Addorupdate(UsersDetails usersDetails,Guid guid);

        Task<UsersDetails> GetUserDeatilSById(int id);
        Task<UsersDetails> deleteUser(int id);

        //Task AddImageAsync(UserImage image);

    }
}
