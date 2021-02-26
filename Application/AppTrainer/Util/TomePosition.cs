using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Util {
    public class TomePosition : ITomePosition {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public TomePosition(DataContext context, IUserAccessor userAccessor) {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<int> GetTomePosition(string tome) {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var tomeToFind = await _context.Tomes.SingleOrDefaultAsync(x => x.Title == tome && x.AppUserId == user.Id);

            return tomeToFind.Position;
        }
    }
}