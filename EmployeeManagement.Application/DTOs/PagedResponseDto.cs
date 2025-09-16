using System.Text.Json.Serialization;

namespace EmployeeManagement.Application.DTOs;

public class PagedResponseDto<T>
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    
    [JsonIgnore]
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    
    public bool HasPrevious => Page > 1;
    public bool HasNext => Page < TotalPages;
}