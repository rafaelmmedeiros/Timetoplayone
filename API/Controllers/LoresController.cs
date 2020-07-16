using System;
using System.Threading.Tasks;
using Application.AppTrainer.Lores;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class LoresController : BaseController
    {
        //  FUNC: RETORNA LORE DE USUARIO LOGADO. MAX SECURITY
        [HttpGet]
        public async Task<ActionResult<UserLore>> Get()
        {
            return await Mediator.Send(new Details.Query { });
        }

        //  FUNC: CREAT A NEW ROW OF TOME FOR THE LOGGED USER
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        //  FUNC: Deleta através do uuid (Guid for Microsoft) recebido.
        [HttpDelete("{id}")]
        //[Authorize(Policy = "IsTomeOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}