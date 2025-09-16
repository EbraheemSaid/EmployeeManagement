using EmployeeManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Employee> Employees => Set<Employee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Position).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Salary).IsRequired().HasColumnType("decimal(18,2)");
            entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(11);
            entity.Property(e => e.Department).IsRequired();
            
            // Add check constraint for phone number format (11 digits)
            entity.ToTable(t => t.HasCheckConstraint("CK_Employee_PhoneNumber", "LEN(PhoneNumber) = 11 AND PhoneNumber NOT LIKE '%[^0-9]%'"));
        });

        base.OnModelCreating(modelBuilder);
    }
}