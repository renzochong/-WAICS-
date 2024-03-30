using Microsoft.AspNetCore.Mvc;
using MyDemoAPI.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Logging; // Ensure this using directive is added for ILogger

namespace MyDemoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")] // Ensure lowercase "c" for consistency
    public class StudentController : ControllerBase
    {
        private static readonly List<Student> _students = Student.GetStudents();

        private readonly ILogger<StudentController> _logger; // Specify the generic type parameter

        public StudentController(ILogger<StudentController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetStudentList")]
        public IEnumerable<Student> Get() => Student.GetStudents(); // Directly return the list without casting
    }
}
