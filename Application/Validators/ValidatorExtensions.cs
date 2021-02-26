using FluentValidation;

namespace Application.Validators {
    //  STATIC, POIS SERÀ USADO COMO ExTENSÂO APENAS>
    public static class ValidatorExtensions {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder) {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password deve conter no monimo 6 caracteres")
                .Matches("[A-Z]").WithMessage("Password deve conter ao menos uma letra maiscula")
                .Matches("[a-z]").WithMessage("Password deve conter ao menos uma letra minuscula")
                .Matches("[0-9]").WithMessage("Password deve conter ao menos um número")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password deve conter ao menos um caracter especial");

            return options;
        }
    }
}