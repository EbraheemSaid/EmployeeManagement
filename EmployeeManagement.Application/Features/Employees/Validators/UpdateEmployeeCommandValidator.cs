using EmployeeManagement.Application.Features.Employees.Commands.UpdateEmployee;
using FluentValidation;

namespace EmployeeManagement.Application.Features.Employees.Validators;

public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Position)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Salary)
            .GreaterThan(0);

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .Matches(@"^\d{11}$")
            .WithMessage("Phone number must be exactly 11 digits");

        RuleFor(x => x.Department)
            .NotNull();
    }
}