using EmployeeManagement.Application.DTOs;
using EmployeeManagement.Application.Interfaces;
using MediatR;
using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.Features.Employees.Queries;

public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto>
{
    private readonly IEmployeeRepository _employeeRepository;

    public GetEmployeeByIdQueryHandler(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<EmployeeDto> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
    {
        var employee = await _employeeRepository.GetByIdAsync(request.Id);
        if (employee == null)
            throw new KeyNotFoundException($"Employee with ID {request.Id} not found.");

        return new EmployeeDto
        {
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Position = employee.Position,
            Salary = employee.Salary,
            PhoneNumber = employee.PhoneNumber,
            Department = employee.Department
        };
    }
}
