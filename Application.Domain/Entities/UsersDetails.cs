using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;

namespace Application.Domain.Entities
{
    public class UsersDetails
    {

    public int? id  {get;set;}
    public string? firstName { get; set; }
    public string? lastName { get; set; }
    public string? email { get; set; }
    public long? phone { get; set; }

    public DateTime? dateOfBirth { get; set; }

    public string? gender { get; set; }

    public string? address { get; set; }

    public string? city { get; set; }

    public string? state { get; set; }

    public long? zipCode { get; set; }

    public string? country { get; set; }

    public string? role { get; set; }
    public string? status { get; set; }
    public DateTime? createdDate { get; set; }

    public DateTime? lastLogin { get; set; }
    public string? avatar { get; set; }

    public Guid? ImageId { get; set; }

    }

//    public class UserImage
//{
//    public Guid Id { get; set; }
//    public string FileName { get; set; } = null!;
//    public DateTime UploadDate { get; set; }
//}
}
