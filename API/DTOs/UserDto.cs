using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        [Required]
        [MaxLength(100)]
        public string DisplayName { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Token { get; set; }
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }

        [MaxLength(100)]
        public string Image { get; set; }
    }
}