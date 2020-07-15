using System.Threading.Tasks;
using Application.AppTrainer.Collections;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CollectionsController : BaseController
    {
        //  FUNC: RETORNA LORE DE USUARIO LOGADO. MAX SECURITY
        [HttpGet]
        public async Task<ActionResult<UserCollection>> Get()
        {
            return await Mediator.Send(new Details.Query { });
        }
    }
}