using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace MyDemoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;

        // Simulating a data store with an in-memory list for demonstration purposes.
        private static readonly List<Product> _products = new List<Product>
        {
            // Initialize with some sample products
            new Product { Id = 1, ItemName = "Laptop", Qty = 10, Location = "A1", Area = "Electronics", Status = "Available" },
            new Product { Id = 2, ItemName = "Desk", Qty = 5, Location = "B2", Area = "Furniture", Status = "Available" },
            new Product { Id = 3, ItemName = "Chair", Qty = 14, Location = "C2", Area = "Furniture", Status = "Available" },
            new Product { Id = 4, ItemName = "Power Supplies", Qty = 123, Location = "P2", Area = "Electronics", Status = "Available" },
            new Product { Id = 5, ItemName = "GPUs", Qty = 0, Location = "G2", Area = "Graphic Interfaces", Status = "Not-Available" }
        };

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        // Additional methods for handling CRUD operations can be added here.
    }
}
