using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contractors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers
{
     [Route("Contractors")]
    public class ContractorsController : BaseApiController
    {
        [AllowAnonymous]
         [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return HandleResult(await BaseMediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContractor(Guid id)
        {
            return HandleResult(await BaseMediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateContractor(Contractor _contr){
            return HandleResult(await BaseMediator.Send(new Create.Command{contractor= _contr}));
        }
         
          [HttpPut("{id}")]
        public async Task<IActionResult> EditContractor(Guid id, Contractor _contr){
            _contr.Id = id;
            return HandleResult(await BaseMediator.Send(new Edit.Command{contractor= _contr}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id){
            return HandleResult(await BaseMediator.Send(new Delete.Command{Id= id}));
        }
    }
}