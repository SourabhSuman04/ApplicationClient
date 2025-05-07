using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entities
{
    public class Users
    {

        public int? id { get; set; }
        public string? username {get;set;}
        public string? email {get;set;}
        public string? password {get;set;}
        public string? role {get;set;}
        public DateTime? createdAt {get;set;}
    }
}
