using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Estudos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] // Substitue pelo 'EstudosContoller'
    [ApiController]
    public class EstudosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EstudosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Estudo>>> List()
        {
            return await _mediator.Send(new List.Query()); // Envia a mensagem a camada de cima e retorna a lista.
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estudo>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}