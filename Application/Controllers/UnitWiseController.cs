using Application.Application.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitWiseController : ControllerBase
    {
        public readonly IUnitWiseService unitWiseService;

        public UnitWiseController(IUnitWiseService _unitWiseService)
        {
            unitWiseService = _unitWiseService;
        }

        [HttpGet]
        [Route("GetAllUnitWiseRecords")]
        public Task<IActionResult> Get()
        {

            var result = unitWiseService.getAllRecords();
            if (result.Result.IsSuccess == true)
            {
                return Task.FromResult<IActionResult>(Ok(result.Result));
            }
            else
            {
                return Task.FromResult<IActionResult>(BadRequest(result.Result));
            }
        }
    }
}
