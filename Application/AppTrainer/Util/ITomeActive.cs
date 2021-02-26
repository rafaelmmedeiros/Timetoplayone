using System.Threading.Tasks;

namespace Application.AppTrainer.Util {
    public interface ITomeActive {
        Task<bool> GetTomeStatus(string tome);
    }
}