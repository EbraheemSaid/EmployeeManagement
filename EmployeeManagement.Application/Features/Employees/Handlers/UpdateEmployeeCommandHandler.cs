using EmployeeManagement.Application.Features.Employees.Commands;
using EmployeeManagement.Application.Interfaces;
using EmployeeManagement.Domain.Entities;
using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Handlers;

public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand>
{
    private readonly IEmployeeRepository _employeeRepository;

    public UpdateEmployeeCommandHandler(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await _employeeRepository.GetByIdAsync(request.Id);
        
        if (employee == null)
        {
            throw new Exception($"Employee with ID {request.Id} not found.");
        }

        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.Position = request.Position;
        employee.Salary = request.Salary;
        employee.PhoneNumber = request.PhoneNumber;
        employee.Department = request.Department;

        await _employeeRepository.UpdateAsync(employee);
    }
}