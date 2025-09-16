using EmployeeManagement.Application.Features.Employees.Commands;
using EmployeeManagement.Application.Interfaces;
using EmployeeManagement.Domain.Entities;
using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Handlers;

public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, int>
{
    private readonly IEmployeeRepository _employeeRepository;

    public CreateEmployeeCommandHandler(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<int> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = new Employee
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Position = request.Position,
            Salary = request.Salary,
            PhoneNumber = request.PhoneNumber,
            Department = request.Department
        };

        var createdEmployee = await _employeeRepository.AddAsync(employee);
        return createdEmployee.Id;
    }
}