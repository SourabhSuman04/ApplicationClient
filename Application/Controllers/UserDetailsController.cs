using Application.Application.Dto;
using Application.Application.Interface;
using Application.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        public readonly IUserDetailsService _userDetailsService;
        private readonly IWebHostEnvironment _env;
        public UserDetailsController(IUserDetailsService userDetailsService, IWebHostEnvironment env)
        {
            _userDetailsService = userDetailsService;
            _env = env;
        }

        [HttpGet]
        [Route("GetUsersDetails")]
        public async Task<IActionResult> GetUsersDetails()
        {
            var result = await _userDetailsService.GetUsersDetails();

            // Assuming result.Data is a List<Usersdetailsdto>, iterate through the list to set ImageUrl for each item
            var ext = ".jpg"; // you can also load extension from DB
            foreach (var user in result.Data)
            {
                var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{user.ImageId}{ext}";
                user.ImageUrl = imageUrl;
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var result = await _userDetailsService.getUserById(id);

            // Assuming result.Data is a single Usersdetailsdto object
            var ext = ".jpg"; // you can also load extension from DB
            var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{result.Data.ImageId}{ext}";
            result.Data.ImageUrl = imageUrl;

            return Ok(result);
        }

        //[HttpPost]
        //[Route("AddorUpdate")]
        //public async Task<IActionResult> AddorUpdate([FromBody] UsersDetails user)
        //{
        //    var result = await _userDetailsService.AddorUpdate(user);
        //    if (result.IsSuccess == true)
        //    {
        //        return Ok(result);
        //    }
        //    else
        //    {
        //        return BadRequest(result);
        //    }
        //}

        [HttpPost]
        [Route("AddorUpdate")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddorUpdate([FromForm] Usersdetailsdto user)
        {
            var ext = Path.GetExtension(user.File.FileName);
            var guid = Guid.NewGuid();
            var fileName = $"{guid}{ext}";
            var folder = Path.Combine(_env.WebRootPath, "images");
            var path = Path.Combine(folder, fileName);

            Directory.CreateDirectory(folder);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await user.File.CopyToAsync(stream);
            }


            var result = await _userDetailsService.AddorUpdate(user,guid);
  
                return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteUserDetails/{id}")]
        public async Task<IActionResult> DeleteUserDetails(int id)
        {
            var result = await _userDetailsService.deleteUsersDetails(id);
            if (result.IsSuccess == true)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}
