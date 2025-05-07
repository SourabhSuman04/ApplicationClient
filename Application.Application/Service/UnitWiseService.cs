using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Application.Interface;
using Application.Domain.Entities;
using Application.Domain.IRepository;
using Demo.Application.Helper;

namespace Application.Application.Service
{
    public class UnitWiseService : IUnitWiseService
    {
        public readonly IUnitWiseRepository unitWiseRepository;
        public UnitWiseService(IUnitWiseRepository _unitWiseRepository)
        {
            unitWiseRepository = _unitWiseRepository;
        }

        public async Task<ApiResponse<IEnumerable<UnitWise>>> getAllRecords()
        {
            try
            {
                var result = await unitWiseRepository.getAllRecords();
                return new ApiResponse<IEnumerable<UnitWise>>(true, "Success", 200, result);
            }
            catch (Exception e)
            {
                return new ApiResponse<IEnumerable<UnitWise>>(false, e.Message, 500, Enumerable.Empty<UnitWise>());
            }
        }
    }
}
