using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Application.DAO;
using Application.Application.Helper;
using Application.Application.Interface;
using Application.Domain.Entities;
using Application.Domain.IRepository;
using Demo.Application.Helper;
using Demo.Application.JWT;
using Microsoft.AspNetCore.Identity;

namespace Application.Application.Service
{
  
public class UserAuthService : IUserAuthService
    {
        public readonly IUserloginRepository _repo;
        public readonly JWTAuthManager jWTAuth;
        public readonly PasswordService passwordService;
        public UserAuthService(IUserloginRepository repo, JWTAuthManager jWTAuth,PasswordService passwordservice)
        {
            _repo = repo;
            this.jWTAuth = jWTAuth;
            this.passwordService = passwordservice;
        }

        public async Task<ApiResponse<UserLoginDAO>> forgotpassword(Users user)
        {
            try 
            {
                var result = await _repo.forgotpassword(user); // Await the Task<Users> result
                UserLoginDAO userLoginDTo = new UserLoginDAO
                {
                    id = result.id,
                    username = result.username,
                    email = result.email,
                    role = result.role,
                    token = this.jWTAuth.GenerateToken(result.username)
                };
                return new ApiResponse<UserLoginDAO>(true, "success", 200, userLoginDTo);

            }
            catch(Exception e)
            {
                return new ApiResponse<UserLoginDAO>(false, e.Message, 500, new UserLoginDAO());
            }

        }

        //public async Task<ApiResponse<UserLoginDAO>> Login(Users user) // Marked method as async
        //{
        //    try
        //    {
        //        var result = await _repo.Login(user); // Await the Task<Users> result
        //        UserLoginDAO userLoginDTo = new UserLoginDAO
        //        {
        //            id = result.id,
        //            username = result.username,
        //            email = result.email,
        //            role=result.role,
        //            token = this.jWTAuth.GenerateToken(result.username)
        //        };
        //        return new ApiResponse<UserLoginDAO>(true, "success", 200, userLoginDTo); // Corrected the generic type to match UserLoginDAO
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle exception
        //        return new ApiResponse<UserLoginDAO>(false, ex.Message, 500, new UserLoginDAO());
        //    }
        //}

        public async Task<ApiResponse<UserLoginDAO>> Login(Users user)
        {
            try
            {
                var result1 = await _repo.GetUserByUsernameAsync(user.username); 
                var result = this.passwordService.VerifyPassword(user, result1.password,user.password);
                if (result == PasswordVerificationResult.Success)
                {
                    var res = await _repo.GetUserByUsernameAsync(user.username);
                    UserLoginDAO userLoginDTo = new UserLoginDAO
                    {
                        id = res.id,
                        username = res.username,
                        email = res.email,
                        role = res.role,
                        token = this.jWTAuth.GenerateToken(res.username)
                    };
                    return new ApiResponse<UserLoginDAO>(true, "success", 200, userLoginDTo);
                }else
                {
                    return new ApiResponse<UserLoginDAO>(false, "Invalid password", 401, new UserLoginDAO());
                }
               
            }
            catch (Exception ex)
            {
                // Handle exception
                return new ApiResponse<UserLoginDAO>(false, ex.Message, 500, new UserLoginDAO());
            }
        }


        public async Task<ApiResponse<Users>> Register(Users user)
        {
            try
            {

                var result = this.passwordService.HashPassword(user, user.password);
                Users us = new Users { 
                    id = user.id,
                    username = user.username,
                    email=user.email,
                    password=result,
                    role=user.role,
                    createdAt=user.createdAt
                    };
                
                var res = await _repo.Register(us);


                return await Task.FromResult(new ApiResponse<Users>(true, "succees", 200, res));
            }
            catch (Exception ex)
            {
                // Handle exception
                return await Task.FromResult(new ApiResponse<Users>(false, ex.Message, 500, new Users()));
            }
        }
    }
}
