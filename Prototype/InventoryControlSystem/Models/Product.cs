#nullable disable
using System.ComponentModel.DataAnnotations;

namespace InventoryControlSystem.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Display(Name ="Item Name")]
        [Required]
        public string ItemName { get; set; }
        [Display(Name = "Qty ")]
        [Required]
        public int Qty { get; set; }
        [Display(Name = "Item Location")]
        [Required]
        public string Location { get; set; }
        [Display(Name = "Item Area")]
        [Required]
        public string Area { get; set; }
        [Required]    
        public string Status { get; set; }  
    }
}
