using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Domain.Entities;

namespace Demo.Application.Helper
{
    public class ApiResponse<T>
    {
        private bool v1;
        private string v2;
        private int v3;
        private Task<IEnumerable<UsersDetails>> result;

        public bool? IsSuccess { get; set; }
        public string? Message { get; set; }
        public int? StatusCode { get; set; }
        public T? Data { get; set; }

        public ApiResponse(bool isSuccess, string message, int statusCode, T data)
        {
            this.IsSuccess = isSuccess;
            this.Message = message;
            this.StatusCode = statusCode;
            this.Data = data;
        }

        public ApiResponse(bool v1, string v2, int v3, Task<IEnumerable<UsersDetails>> result)
        {
            this.v1 = v1;
            this.v2 = v2;
            this.v3 = v3;
            this.result = result;
        }
    }
}
