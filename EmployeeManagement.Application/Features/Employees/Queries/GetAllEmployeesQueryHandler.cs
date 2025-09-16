using EmployeeManagement.Application.DTOs;
using EmployeeManagement.Application.Interfaces;
using MediatR;

namespace EmployeeManagement.Application.Features.Employees.Queries;

public class GetAllEmployeesQueryHandler : IRequestHandler<GetAllEmployeesQuery, PagedResponseDto<EmployeeDto>>
{
    private readonly IEmployeeRepository _employeeRepository;

    public GetAllEmployeesQueryHandler(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<PagedResponseDto<EmployeeDto>> Handle(GetAllEmployeesQuery request, CancellationToken cancellationToken)
    {
        // Get total count
        var totalCount = await _employeeRepository.GetCountAsync();
        
        // Get paginated data
        var employees = await _employeeRepository.GetAllAsync(request.Page, request.PageSize);
        
        var employeeDtos = employees.Select(e => new EmployeeDto
        {
            Id = e.Id,
            FirstName = e.FirstName,
            LastName = e.LastName,
            Position = e.Position,
            Salary = e.Salary,
            PhoneNumber = e.PhoneNumber,
            Department = e.Department
        });

        return new PagedResponseDto<EmployeeDto>
        {
            Data = employeeDtos,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }
}
