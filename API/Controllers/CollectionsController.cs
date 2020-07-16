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

        //  FUNC: CREAT A NEW ROW OF ETUDE FOR THE LOGGED USER
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}