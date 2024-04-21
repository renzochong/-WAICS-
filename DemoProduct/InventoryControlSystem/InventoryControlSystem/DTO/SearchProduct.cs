#nullable disable
namespace InventoryControlSystem.DTO
{
    public class SearchProduct
    {
        public int id {  get; set; }    
        public string itemName { get; set; }
        public string location { get; set; }
        public string status { get; set; }
        public int qtyMin { get; set; }
        public int qtyMax { get; set; }
    }
}
