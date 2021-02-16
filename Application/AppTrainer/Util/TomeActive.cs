using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Util
{
    public class TomeActive : ITomeActive
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public TomeActive(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<bool> GetTomeStatus(string tome)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var tomeToFind = await _context.Tomes.SingleOrDefaultAsync(x => x.Title == tome && x.AppUserId == user.Id);

            return tomeToFind.Active;
        }
    }
}