using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route ("profiles")]
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await BaseMediator.Send(new Details.Query { UserName = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await BaseMediator.Send(command));
        }

        // [HttpGet("{username}/activities")]
        // public async Task<IActionResult> GetUserActivities(string username, string predicate)
        // {
        //     return HandleResult(await BaseMediator.Send(new ListActivities.Query
        //     { Username = username, Predicate = predicate }));
        // }
    }
}