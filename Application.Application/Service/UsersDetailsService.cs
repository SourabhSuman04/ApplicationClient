using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Application.Interface;
using Application.Domain.Entities;
using Application.Domain.IRepository;
using Demo.Application.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Application.Application.Dto;


namespace Application.Application.Service
{
    public class UsersDetailsService : IUserDetailsService
    {
        public readonly IUsersDetailsRepository usersDetailsRepository;

        public UsersDetailsService(IUsersDetailsRepository usersDetailsRepository)

        {
            this.usersDetailsRepository = usersDetailsRepository;
            
        }

        public async Task<ApiResponse<UsersDetails>> AddorUpdate(Usersdetailsdto user, Guid guid)
        {
            try
            {
                UsersDetails usersDetails = new UsersDetails
                {
                    id = user.id,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    email = user.email,
                    phone = user.phone,
                    dateOfBirth = user.dateOfBirth,
                    gender = user.gender,
                    address = user.address,
                    city = user.city,
                    state = user.state,
                    zipCode = user.zipCode,
                    country = user.country,
                    role = user.role,
                    status = user.status,
                    //createdDate = user.createdDate,
                    lastLogin = user.lastLogin,
                    //avatar = user.avatar,
                    ImageId = guid

                };


                var result = await usersDetailsRepository.Addorupdate(usersDetails, guid);

                return new ApiResponse<UsersDetails>(
                    true, "User details added/updated successfully", 200, result
                );
            }
            catch (Exception e)
            {
                return new ApiResponse<UsersDetails>(
                    false, "An error occurred while adding/updating user details", 500, new UsersDetails()
                );
            }
        }

        public async Task<ApiResponse<Usersdetailsdto>> getUserById(int id)
        {
            try
            {
                var result = await usersDetailsRepository.GetUserDeatilSById(id);

                Usersdetailsdto usersdetailsdto = new Usersdetailsdto
                {
                    id = result.id,
                    firstName = result.firstName,
                    lastName = result.lastName,
                    email = result.email,
                    phone = result.phone,
                    dateOfBirth = result.dateOfBirth,
                    gender = result.gender,
                    address = result.address,
                    city = result.city,
                    state = result.state,
                    zipCode = result.zipCode,
                    country = result.country,
                    role = result.role,
                    status = result.status,
                    //createdDate = result.createdDate,
                    lastLogin = result.lastLogin,
                    //avatar = result.avatar,
                    ImageId = result.ImageId,
                    ImageUrl = " "
                };


                return new ApiResponse<Usersdetailsdto>(
                    true,
                    "User details retrieved successfully",
                    200,
                    usersdetailsdto
                );
            }
            catch (Exception e)
            {
                return new ApiResponse<Usersdetailsdto>(
                    false, "An error occurred while retrieving user details", 500, new Usersdetailsdto()
                );
            }
        }

        public async Task<ApiResponse<List<Usersdetailsdto>>> GetUsersDetails()
        {
            try
            {
                var result = await usersDetailsRepository.GetUsersDetails();

                // Map each UsersDetails object to a Usersdetailsdto object
                var usersDetailsDtos = result.Select(user => new Usersdetailsdto
                {
                    id = user.id,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    email = user.email,
                    phone = user.phone,
                    dateOfBirth = user.dateOfBirth,
                    gender = user.gender,
                    address = user.address,
                    city = user.city,
                    state = user.state,
                    zipCode = user.zipCode,
                    country = user.country,
                    role = user.role,
                    status = user.status,
                    lastLogin = user.lastLogin,
                    ImageId = user.ImageId,
                    ImageUrl = ""
                }).ToList();

                return new ApiResponse<List<Usersdetailsdto>>(
                    true,
                    "Success",
                    200,
                    usersDetailsDtos
                );
            }
            catch (Exception e)
            {
                // Optional: log e.Message or e.StackTrace
                return new ApiResponse<List<Usersdetailsdto>>(
                    false,
                    e.Message,
                    500,
                    new List<Usersdetailsdto>()
                );
            }
        }

        public async Task<ApiResponse<UsersDetails>> deleteUsersDetails(int id)
        {
            try
            {
                var result = await usersDetailsRepository.deleteUser(id);
                return new ApiResponse<UsersDetails>(true,"success",200,result);
            }
            catch (Exception e)
            {
                return new ApiResponse<UsersDetails>(false, e.Message, 500, new UsersDetails()
                );
            }
        }

    

    }
}
