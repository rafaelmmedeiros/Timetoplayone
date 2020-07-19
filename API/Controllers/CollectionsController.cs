using System;
using System.Threading.Tasks;
using Application.AppTrainer.Collections;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CollectionsController : BaseController
    {
        //  FUNC: RETORNA COLLECTION DE USUARIO LOGADO. MAX SECURITY
        [HttpGet]
        public async Task<ActionResult<UserCollection>> Get()
        {
            return await Mediator.Send(new Details.Query { });
        }

        //  FUNC: RETURN ONLY ONE ETUDE FOR EDIT
        [HttpGet("{id}")]
        public async Task<ActionResult<EtudeEditDto>> Details(Guid id)
        {
            return await Mediator.Send(new Detail.Query { Id = id });
        }

        //  FUNC: CREATE A NEW ROW OF ETUDE FOR THE LOGGED USER
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        //  FUNC: EDIT A ROW THAT BELONGS TO THE LOGGED USER
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}