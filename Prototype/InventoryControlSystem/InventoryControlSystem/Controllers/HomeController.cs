using InventoryControlSystem.Areas.Identity.Data;
using InventoryControlSystem.DTO;
using InventoryControlSystem.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace InventoryControlSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly ApplicationDbContext _context;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context; 
        }

        public IActionResult Index()
        {
            return View();
        }    
        
        public IActionResult GetProduct()
        {
            var obj = _context.Products.ToList();
            return Json(obj);
        }

        public IActionResult SearchProduct(SearchProduct product)
        {
            var obj = _context.Products.ToList();
            if(product.id > 0)
            {
                obj = obj.Where(x => x.Id == product.id).ToList();
                return Json(obj);
            }
            else if(product.itemName !=null)
            {
                obj = obj.Where(x => x.ItemName.Contains(product.itemName)).ToList();
                return Json(obj);
            }
            else if (product.location != null)
            {
                obj = obj.Where(x => x.Location.Contains(product.location)).ToList();
                return Json(obj);
            }
            
            else if (product.qtyMin > 0)
            {
                obj = obj.Where(x => x.Qty == product.qtyMin).ToList();
                return Json(obj);
            }
            else if (product.qtyMax > 0)
            {
                obj = obj.Where(x => x.Qty == product.qtyMax).ToList();
                return Json(obj);
            }
            else if (product.status != null)
            {
                obj = obj.Where(x => x.Status == product.status).ToList();
                return Json(obj);
            }
            return Json(obj);
        }
        public IActionResult AddInventory()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddInventory(Product product)
        {
            if(product != null)
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        [HttpPost]
        public IActionResult Inventory(int id)
        {
            var obj = _context.Products.Find(id);
            return Json(obj);
        }

        [HttpPost]
        public IActionResult UpdateQty(UpdateQty qty)
        {
            try
            {
                var obj = _context.Products.Find(qty.itemId);
                if (obj != null)
                {
                    obj.Qty = qty.qtyToAdd;
                    _context.SaveChanges();
                    return Json(obj);
                }
                else
                {
                    return Json(new { error = "Item not found" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json(new { error = "An error occurred while updating quantity" });
            }
        }

        [HttpPost]
        public IActionResult RemoveQt(UpdateQty qty)
        {
            try
            {
                var obj = _context.Products.Find(qty.itemId);
                if (obj != null)
                {
                    if (qty.qtyToRemove <= obj.Qty)
                    {
                        obj.Qty -= qty.qtyToRemove;
                        _context.SaveChanges();
                        return Json(obj);
                    }
                    else
                    {
                        return Json(false); 
                    }
                }
                else
                {
                    return Json(new { error = "Item not found" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json(new { error = "An error occurred while updating quantity" });
            }
        }



        [HttpPost]
        public IActionResult EditStatus(UpdateQty qty)
        {
            try
            {
                var obj = _context.Products.Find(qty.itemId);
                if (obj != null)
                {
                    if (qty.EditQntyRemove <= obj.Qty)
                    {
                        obj.Qty -= qty.EditQntyRemove;
                        obj.Status = qty.selectedStatus;
                        _context.SaveChanges();
                        return Json(obj);
                    }
                    else
                    {
                        return Json(false);
                    }
                }
                else
                {
                    return Json(new { error = "Item not found" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Json(new { error = "An error occurred while updating quantity" });
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
