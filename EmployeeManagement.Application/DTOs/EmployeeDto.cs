using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.DTOs;

public class EmployeeDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public decimal Salary { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;
    public Department Department { get; set; }
}