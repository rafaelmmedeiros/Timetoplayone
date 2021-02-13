using System.Threading.Tasks;

namespace Application.AppTrainer.Util
{
    public interface ITomePosition
    {
        Task<int> GetTomePosition(string tome);

    }
}