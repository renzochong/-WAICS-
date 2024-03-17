#nullable disable
namespace InventoryControlSystem.DTO
{
    public class UpdateQty
    {
        public int itemId {  get; set; }    
        public int qtyToAdd {  get; set; }    
        public int qtyToRemove {  get; set; }    
        public int EditQntyRemove {  get; set; }    
        public string selectedStatus {  get; set; }    
    }
}
