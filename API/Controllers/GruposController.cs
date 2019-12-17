using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Grupos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GruposController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GruposController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Grupo>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Grupo>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

    }
}