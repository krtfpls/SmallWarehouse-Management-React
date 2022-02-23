using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Contractors
{
    public class ContractorDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
    }
}