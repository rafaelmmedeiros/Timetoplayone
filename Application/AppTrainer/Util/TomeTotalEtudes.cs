using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Util
{
    public class TomeTotalEtudes : ITomeTotalEtudes
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public TomeTotalEtudes(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<int> GetTomeQuantity(string tome)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var tomesQuantity = await _context.Etudes.CountAsync(x => x.Tome == tome && x.AppUserId == user.Id);

            return tomesQuantity;
        }
    }
}