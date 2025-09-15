using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Commands;

public record CreateEmployeeCommand(
    string FirstName,
    string LastName,
    string Position,
    decimal Salary,
    string PhoneNumber) : IRequest<int>;

public record UpdateEmployeeCommand(
    int Id,
    string FirstName,
    string LastName,
    string Position,
    decimal Salary,
    string PhoneNumber) : IRequest;

public record DeleteEmployeeCommand(int Id) : IRequest;