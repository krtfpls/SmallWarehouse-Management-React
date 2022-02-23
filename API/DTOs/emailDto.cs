using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class emailDto
    {
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email {get;set;}

        [MaxLength(1000)]
        public string Token { get; set; }
    }
}