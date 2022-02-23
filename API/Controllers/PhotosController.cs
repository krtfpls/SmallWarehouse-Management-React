using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.FileUpload;

namespace API.Controllers
{
     [Route("photos")]
    public class PhotosController: BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddPhoto.Command command){
            return HandleResult(await BaseMediator.Send(command));
        }
        
    }
}