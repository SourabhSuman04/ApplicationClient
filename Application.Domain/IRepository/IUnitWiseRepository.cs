using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;

namespace Application.Domain.IRepository
{
    public interface IUnitWiseRepository
    {
        public Task<IEnumerable<UnitWise>> getAllRecords();
    }
}
