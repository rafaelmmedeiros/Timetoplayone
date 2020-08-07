using System.Threading.Tasks;
using Application.AppTrainer.Chapters;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChaptersController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List.ChapterEnvelope>> List()
        {
            return await Mediator.Send(new List.Query());
        }

    }
}