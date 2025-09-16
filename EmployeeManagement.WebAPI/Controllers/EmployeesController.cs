using EmployeeManagement.Application.Features.Employees.Commands;
using EmployeeManagement.Application.Features.Employees.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;

    public EmployeesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var query = new GetAllEmployeesQuery { Page = page, PageSize = pageSize };
        var pagedResponse = await _mediator.Send(query);
        return Ok(pagedResponse);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var query = new GetEmployeeByIdQuery(id);
        var employee = await _mediator.Send(query);
        return Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeCommand command)
    {
        var employeeId = await _mediator.Send(command);
        return Ok(new { Id = employeeId });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeCommand command)
    {
        var updateCommand = command with { Id = id };
        await _mediator.Send(updateCommand);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var command = new DeleteEmployeeCommand(id);
        await _mediator.Send(command);
        return NoContent();
    }
}