using MediatR;
using EmployeeManagement.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Application.Features.Employees.Commands;

public record CreateEmployeeCommand(
    [Required, MaxLength(50)] string FirstName,
    [Required, MaxLength(50)] string LastName,
    [Required, MaxLength(100)] string Position,
    [Required, Range(0, double.MaxValue)] decimal Salary,
    [Required, RegularExpression(@"^\d{11}$", ErrorMessage = "Phone number must be exactly 11 digits")] string PhoneNumber,
    [Required] Department Department) : IRequest<int>;

public record UpdateEmployeeCommand(
    int Id,
    [Required, MaxLength(50)] string FirstName,
    [Required, MaxLength(50)] string LastName,
    [Required, MaxLength(100)] string Position,
    [Required, Range(0, double.MaxValue)] decimal Salary,
    [Required, RegularExpression(@"^\d{11}$", ErrorMessage = "Phone number must be exactly 11 digits")] string PhoneNumber,
    [Required] Department Department) : IRequest;

public record DeleteEmployeeCommand(int Id) : IRequest;