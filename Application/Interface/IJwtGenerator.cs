using Domain;

namespace Application.Interface
{
    public interface IJwtGenerator
    {
         string CreateToekn(AppUser user);
    }
}