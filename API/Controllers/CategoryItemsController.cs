using System;
using System.Threading.Tasks;
using Application.CategoryItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers
{
    [Route("CategoryProducts")]
    public class CategoryItemsController: BaseApiController
    {
         [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            return HandleResult(await BaseMediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            return HandleResult(await BaseMediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(CategoryItem item){
            
            return HandleResult(await BaseMediator.Send(new Create.Command{Item= item}));
        }
         
          [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(int id, CategoryItem item){
            item.Id = id;
            return HandleResult(await BaseMediator.Send(new Edit.Command{EditItem= item}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id){
            return HandleResult(await BaseMediator.Send(new Delete.Command{Id= id}));
        }
    }
}