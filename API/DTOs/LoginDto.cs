using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email {get;set;}

        [Required]
        [MaxLength(100)]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$")]
       public string Password { get; set; }
    }
}