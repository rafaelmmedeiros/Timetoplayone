using System.Threading.Tasks;
using Application.AppTrainer.Chapters;
using Application.AppTrainer.Chapters.Others;
using MediatR;
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

        [HttpGet("today")]
        public async Task<ActionResult<ChapterListDto>> TodayChapter()
        {
            return await Mediator.Send(new TodayChapter.Query { });
        }

        [HttpGet("begin")]
        public async Task<ActionResult<Unit>> Begin()
        {
            return await Mediator.Send(new Begin.Command { });
        }

    }
}