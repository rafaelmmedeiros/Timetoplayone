using System.Threading.Tasks;
using Application.AppTrainer.Practices;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PracticesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.PracticeEnvelope>> List()
        {
            return await Mediator.Send(new List.Query());
        }

    }
}