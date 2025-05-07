
using Application.Application.Interface;
using Application.Domain.Entities;
using Demo.Application.JWT;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthController : ControllerBase
    {
     
        private readonly IUserAuthService _userAuthService;

        private readonly JWTAuthManager jWTAuth;
        public UserAuthController(IUserAuthService userAuthService, JWTAuthManager jWTAuth)
        {
           this._userAuthService = userAuthService;
            this.jWTAuth = jWTAuth;
        }

        [HttpPost]
        public async Task<IActionResult> Get(Users user)
        {
            var res = await _userAuthService.Login(user);
            return Ok(res);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(Users user)
        {
            try
            {
                var result = await _userAuthService.Register(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Handle exception
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> Getpassword(Users user)
        {
            var res = await _userAuthService.forgotpassword(user);
            return Ok(res);
        }

        [HttpGet("manual-token")]
        public IActionResult GetManualToken()
        {
            var token = this.jWTAuth.GenerateToken("ManualUser");
            return Ok(new { token });
        }

    }
}
