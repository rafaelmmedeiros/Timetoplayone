using System.Threading.Tasks;

namespace Application.AppTrainer.Util {
    public interface ITomeTotalTIme {
        Task<int> GetTomeTime(string tome);
    }
}