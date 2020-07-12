using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsRepertoireOwnerRequirement : IAuthorizationRequirement
    {
    }

    public class IsRepertoireOwnerRequirementHandler : AuthorizationHandler<IsRepertoireOwnerRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public IsRepertoireOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsRepertoireOwnerRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = _context.Users.FindAsync(currentUserName).Result;

            var repertoireId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());
            var repertoire = _context.Repertoires.FindAsync(repertoireId).Result;

            if (repertoire?.AppUserId == user.Id)
                context.Succeed(requirement);

            //TODO : Fazer isso funcionar!! 
            //Primeira condição do IF... é para bypass

            return Task.CompletedTask;
        }
    }
}