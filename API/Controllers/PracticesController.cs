using System.Threading.Tasks;
using Application.AppTrainer.Practices;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System;
namespace API.Controllers
{
    public class PracticesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<Acquire.PracticeEnvelope>> List()
        {
            return await Mediator.Send(new Acquire.Query());
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Unit>> Done(Guid id)
        {
            return await Mediator.Send(new Done.Command { Id = id });
        }
    }
}