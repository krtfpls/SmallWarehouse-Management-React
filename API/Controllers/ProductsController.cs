using System;
using System.Threading.Tasks;
using Application.Core;
using Application.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers
{
    
     [Route("Products")]
    public class ProductsController : BaseApiController
    {
       
         [HttpGet]
        public async Task<IActionResult> GetAllItems([FromQuery]ProductParams param)
        {
            return HandlePagedResult(await BaseMediator.Send(new List.Query{Params= param}));
        }

  [Authorize(Policy = "IsHost")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(Guid id)
        {
            return HandleResult(await BaseMediator.Send(new Details.Query{id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(ProductDTO item){
            return HandleResult(await BaseMediator.Send(new Create.Command{Item= item}));
        }

          [Authorize(Policy = "IsHost")]
          [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, ProductDTO item){
            item.Id = id;
            return HandleResult(await BaseMediator.Send(new Edit.Command{item= item}));
        }

        [Authorize(Policy = "IsHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id){
            return HandleResult(await BaseMediator.Send(new Delete.Command{Id= id}));
        }
    }
}