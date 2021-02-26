using System.Threading.Tasks;

namespace Application.AppTrainer.Util {
    public interface ITomeTotalEtudes {
        Task<int> GetTomeQuantity(string tome);
    }
}