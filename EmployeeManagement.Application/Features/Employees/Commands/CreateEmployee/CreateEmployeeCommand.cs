using MediatR;
using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.Features.Employees.Commands.CreateEmployee;

public record CreateEmployeeCommand(
    string FirstName,
    string LastName,
    string Position,
    decimal Salary,
    string PhoneNumber,
    Department Department) : IRequest<int>;