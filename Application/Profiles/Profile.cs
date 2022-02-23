using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model;

namespace Application.Profiles
{
    public class Profile
    {
        public string userName { get; set; }
        public string userForname {get;set;}
        public string DisplayName { get; set; }
        public string PhoneNumber {get; set;}
        public string Image { get; set; }
        public Photo Photo {get;set;}
    }
}