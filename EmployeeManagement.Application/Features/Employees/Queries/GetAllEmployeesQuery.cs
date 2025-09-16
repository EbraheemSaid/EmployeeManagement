using EmployeeManagement.Application.DTOs;
using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Queries;

public record GetAllEmployeesQuery : IRequest<PagedResponseDto<EmployeeDto>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public record GetEmployeeByIdQuery(int Id) : IRequest<EmployeeDto>;