using System.Threading.Tasks;
using Application.AppTrainer.Repertoires;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RepertoiresController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<UserRepertoire>> Get(string username)
        {
            return await Mediator.Send(new Details.Query { Username = username });
        }
    }
}