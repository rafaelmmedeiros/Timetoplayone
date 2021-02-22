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

        [HttpPost("decrease")]
        public async Task<ActionResult<Unit>> Decrease()
        {
            return await Mediator.Send(new DecreaseObjective.Command { });
        }

        [HttpPost("increase")]
        public async Task<ActionResult<Unit>> Increase()
        {
            return await Mediator.Send(new IncreaseObjective.Command { });
        }

        [HttpGet("week")]
        public async Task<ActionResult<AcquireWeek.ChaptersWeekEnvelope>> AcquireWeek()
        {
            return await Mediator.Send(new AcquireWeek.Query());
        }

    }
}