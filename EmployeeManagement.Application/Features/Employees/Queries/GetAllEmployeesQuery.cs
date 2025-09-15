using EmployeeManagement.Application.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Queries;

public record GetAllEmployeesQuery : IRequest<IEnumerable<EmployeeDto>>;

public record GetEmployeeByIdQuery(int Id) : IRequest<EmployeeDto>;