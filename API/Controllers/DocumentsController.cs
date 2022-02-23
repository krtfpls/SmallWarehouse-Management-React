using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Documents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers
{
    [Route("documents")]
    public class DocumentController:BaseApiController
    {
      [HttpGet]
        public async Task<IActionResult> GetAllDoc([FromQuery]DocumentParams param)
        {
            return HandlePagedResult(await BaseMediator.Send(new List.Query{Params= param}));
        }

         [HttpGet("{id}")]
        public async Task<IActionResult> GetDoc(Guid id)
        {
           return HandleResult(await BaseMediator.Send(new Details.Query{Id=id}));
        }

          [HttpPost("in")]
        public async Task<IActionResult> InDoc(DocumentsDto _document){
            return HandleResult(await BaseMediator.Send(new Create.Command{Document= _document, IsIncome=true}));
        }

        [HttpPost("out")]
        public async Task<IActionResult> OutDoc(DocumentsDto _document){
            return HandleResult(await BaseMediator.Send(new Create.Command{Document= _document, IsIncome=false}));
        }
    }
}