using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Model
{
    public class User: IdentityUser
    {   public string DisplayName {get; set;}
        public string UserForname {get;set;}
        public Photo Photo {get;set;}
        public ICollection<Product> Products {get;set;} 
        public ICollection<RefreshToken> RefreshToken {get; set;} = new List<RefreshToken>();
    }
}