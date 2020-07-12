using System;
using System.Threading.Tasks;
using Application.AppTrainer.Repertoires;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class RepertoiresController : BaseController
    {
        //  FUNC: Retorna repertorios de um usuario.
        [HttpGet("{username}")]
        public async Task<ActionResult<UserRepertoire>> Get(string username)
        {
            return await Mediator.Send(new Details.Query { Username = username });
        }

        //  FUNC: Criar novo Repertoire.
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        //  FUNC: Deleta através do uuid (Guid for Microsoft) recebido.
        [HttpDelete("{id}")]
        //[Authorize(Policy = "IsRepertoireOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}