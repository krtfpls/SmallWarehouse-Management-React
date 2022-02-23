using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public string DisplayName { get; set; }
        
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", ErrorMessage ="Hasło musi zawierać dużą, małą literę oraz cyfrę oraz byc w przedziale 4-16 znaków")]
        public string Password { get; set; }

        [MaxLength(100)]
        [Required]
        public string UserName { get; set; }
    }
}