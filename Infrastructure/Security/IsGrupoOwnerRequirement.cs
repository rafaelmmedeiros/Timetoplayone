using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsGrupoOwnerRequirement : IAuthorizationRequirement
    {
    }

    public class IsGrupoOwnerRequirementHandler : AuthorizationHandler<IsGrupoOwnerRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public IsGrupoOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsGrupoOwnerRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var grupoId = Guid.Parse
                (_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

            var grupo = _context.Grupos.FindAsync(grupoId).Result;

            //var owner = grupo.AppUser.UserName.FirstOrDefault(x => x.);

            //TODO : Fazer isso funcionar!! 
            //Primeira condição do IF... é para bypass
            //Entender a navegação do Entity

            if (currentUserName == currentUserName)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}