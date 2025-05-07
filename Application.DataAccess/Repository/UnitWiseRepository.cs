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
    public class UnitWiseRepository : IUnitWiseRepository
    {
        public readonly IDbConnection dbconnection;
        public UnitWiseRepository(IDbConnection _dbconnection) 
        {
            dbconnection = _dbconnection;
        }

        public async Task<IEnumerable<UnitWise>> getAllRecords()
        {
            try
            {
                return await dbconnection.QueryAsync<UnitWise>("GetAllUnitWiseRecords");
            }
            catch (Exception e)
            {
                throw;
            }

        }
    }
}
