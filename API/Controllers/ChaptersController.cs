using System.Threading.Tasks;
using Application.AppTrainer.Chapters;
using Application.AppTrainer.Chapters.Others;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class ChaptersController : BaseController {

        [HttpGet("today")]
        public async Task<ActionResult<ChapterTodayDto>> TodayChapter() {
            return await Mediator.Send(new TodayChapter.Query { });
        }

        [HttpPost("decrease")]
        public async Task<ActionResult<Unit>> Decrease() {
            return await Mediator.Send(new DecreaseObjective.Command { });
        }

        [HttpPost("increase")]
        public async Task<ActionResult<Unit>> Increase() {
            return await Mediator.Send(new IncreaseObjective.Command { });
        }

        [HttpGet("week")]
        public async Task<ActionResult<AcquireWeek.ChaptersWeekEnvelope>> AcquireWeek() {
            return await Mediator.Send(new AcquireWeek.Query());
        }

        [HttpGet("month")]
        public async Task<ActionResult<AcquireMonth.ChapterMonthEnvelope>> AcquireMonth() {
            return await Mediator.Send(new AcquireMonth.Query());
        }

        [HttpGet("season")]
        public async Task<ActionResult<AcquireSeason.ChapterSeasonEnvelope>> AcquireSeason() {
            return await Mediator.Send(new AcquireSeason.Query());
        }

        [HttpGet("brief")]
        public async Task<ActionResult<ChapterWeekBriefDto>> AcquireBrief() {
            return await Mediator.Send(new AcquireBrief.Query());
        }

    }
}