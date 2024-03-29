using System.Threading.Tasks;
using Domain;
using MediatR;
using System.Threading;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Net;
using Application.Errors;
using Application.Interfaces;
using System.Linq;

namespace Application.User {
    public class Login {
        public class Query : IRequest<User> {
            public string Email { get; set; }
            public string Password { get; set; }

        }

        public class QueryValidator : AbstractValidator<Query> {
            public QueryValidator() {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User> {

            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator) {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken) {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null) {
                    throw new RESTException(HttpStatusCode.Unauthorized);
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                //  ANALISANDO RESULTADO (CHECKING RESULTS)
                if (result.Succeeded) {
                    //  TODO: GERAR TOKEN
                    return new User {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),//  Não tem conhecimento sobre o que está acontecendo.
                        Username = user.UserName,
                        Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
                    };
                } else {
                    throw new RESTException(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}