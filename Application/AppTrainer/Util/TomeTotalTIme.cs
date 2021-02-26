using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Util {
    public class TomeTotalTIme : ITomeTotalTIme {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public TomeTotalTIme(DataContext context, IUserAccessor userAccessor) {
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task<int> GetTomeTime(string tome) {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var queryable = _context.Etudes
                .Where(x => x.Tome == tome && x.AppUserId == user.Id && x.Active == true)
                .AsQueryable();

            var etudes = queryable.ToList();
            var totalTIme = 0;

            foreach (var userEtude in etudes) {
                totalTIme += userEtude.Time;
            }

            return totalTIme;
        }
    }
}