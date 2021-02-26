using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security {
    public class IsTomeOwnerRequirement : IAuthorizationRequirement {
    }

    public class IsTomeOwnerRequirementHandler : AuthorizationHandler<IsTomeOwnerRequirement> {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public IsTomeOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context) {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsTomeOwnerRequirement requirement) {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = _context.Users.FindAsync(currentUserName).Result;

            var tomeId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());
            var tome = _context.Tomes.FindAsync(tomeId).Result;

            if (tome?.AppUserId == user.Id)
                context.Succeed(requirement);

            //TODO : Fazer isso funcionar!! 
            //Primeira condição do IF... é para bypass

            return Task.CompletedTask;
        }
    }
}