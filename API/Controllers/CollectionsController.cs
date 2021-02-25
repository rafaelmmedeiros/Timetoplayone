using System;
using System.Threading.Tasks;
using Application.AppTrainer.Collections;
using Application.AppTrainer.Collections.Others;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class CollectionsController : BaseController {
        
        [HttpGet]
        public async Task<ActionResult<Acquire.EtudeEnvelope>> Get() {
            return await Mediator.Send(new Acquire.Query { });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EtudeEditDto>> Details(Guid id) {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command) {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/fluencelearning")]
        public async Task<ActionResult<Unit>> FluenceLearning(Guid id) {
            return await Mediator.Send(new FluenceLearning.Command { Id = id });
        }

        [HttpPost("{id}/fluenceevolution")]
        public async Task<ActionResult<Unit>> FluenceEvolution(Guid id) {
            return await Mediator.Send(new FluenceEvolution.Command { Id = id });
        }

        [HttpPost("{id}/fluenceflowing")]
        public async Task<ActionResult<Unit>> FluenceFlowing(Guid id) {
            return await Mediator.Send(new FluenceFlowing.Command { Id = id });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/changeactive")]
        public async Task<ActionResult<Unit>> ChangeActive(Guid id) {
            return await Mediator.Send(new ChangeActive.Command { Id = id });
        }
    }
}