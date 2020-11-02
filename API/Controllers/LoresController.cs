using System;
using System.Threading.Tasks;
using Application.AppTrainer.Lores;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.AppTrainer.Lores.Others;

namespace API.Controllers
{
    public class LoresController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<Acquire.TomeEnvelope>> Acquire()
        {
            return await Mediator.Send(new Acquire.Query { });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        //[Authorize(Policy = "IsTomeOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}