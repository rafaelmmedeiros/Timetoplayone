using System;
using System.Threading.Tasks;
using Application.AppTrainer.Collections;
using Application.AppTrainer.Collections.Others;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CollectionsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<UserCollection>> Get()
        {
            return await Mediator.Send(new Acquire.Query { });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EtudeEditDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}