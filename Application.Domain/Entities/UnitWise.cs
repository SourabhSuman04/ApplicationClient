using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entities
{
    public class UnitWise
    {
        public string BH { get; set; }
        public string Funder {get;set;}
        public string State {get;set;}
        public string Unit {get;set;}
        public float Visited_Clients {get;set;}
        public float Reduced {get;set;}
        public float Collected {get;set;}
        public float Collected_Amount {get;set;}
    }
}
