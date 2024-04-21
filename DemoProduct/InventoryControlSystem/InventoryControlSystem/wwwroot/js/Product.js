$(function () {
    $.ajax({
        url: '/Home/GetProduct',
        type: 'GET',
        success: function (response) {
            var tbody = $('.inventry-table tbody');
            tbody.empty(); 
            var zeroQtyItems = [];
            var nonzeroQtyItems = [];

            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                var row = $('<tr></tr>');
                row.addClass('table-row');
                row.attr('data-id', item.id);
                row.attr('data-qty', item.qty);
                var idCell = $('<td></td>').text(item.id);
                var itemCell = $('<td></td>').text(item.itemName);
                var qtyCell = $('<td></td>').text(item.qty);
                var locationCell = $('<td></td>').text(item.location);
                var areaCell = $('<td></td>').text(item.area);
                var statusCell = $('<td></td>').text(item.status);
                row.append(idCell, itemCell, qtyCell, locationCell, areaCell, statusCell);
                if (item.qty === 0) {
                    zeroQtyItems.push(row);
                } else {
                    nonzeroQtyItems.push(row);
                }
            }
            tbody.append(nonzeroQtyItems);
            for (var j = 0; j < zeroQtyItems.length; j++) {
                tbody.append(zeroQtyItems[j]);
            }
        },
        error: function (xhr, status, error) {
            console.error('Failed to make the AJAX call:', error);
        }
    });
});
$(function () {
    $('.inventry-table').on('click', '.table-row', function () {
        var id = $(this).data('id');
        $.ajax({
            url: '/Home/Inventory',
            type: 'POST',
            data: { id: id },
            success: function (response) {
                $('#itemid').text(response.id);
                $('#itemName').text(response.itemName);
                $('#itemLocation').text(response.location);
                $('#itemArea').text(response.area);
                $('#itemStatus').text(response.status);
                $('#itemQty').text(response.qty);
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
function showAddQtyFields() {
    document.getElementById('initialButtons').style.display = 'none';
    document.getElementById('addQtyFields').style.display = 'block';
    document.getElementById('previousLink').style.display = 'inline';
}
function showRemoveQtyFields() {
    document.getElementById('initialButtons').style.display = 'none';
    document.getElementById('RemoveQtyFields').style.display = 'block';
    document.getElementById('previousLink').style.display = 'inline';
}
function showEditFields() {
    document.getElementById('initialButtons').style.display = 'none';
    document.getElementById('EditStatusFields').style.display = 'block';
    document.getElementById('previousLink').style.display = 'inline';
}
function hidePreviousLink() {
    document.getElementById('previousLink').style.display = 'none';
}
function goBack() {
    document.getElementById('initialButtons').style.display = 'block';
    document.getElementById('RemoveQtyFields').style.display = 'none';
    document.getElementById('previousLink').style.display = 'none';
}

$('.inventry-table').on('click', '.table-row', function () {
    var itemId = $(this).data('id');
    $('#itemid').val(itemId);
});

//Remove qty work
$('.inventry-table').on('click', '.table-row', function () {
    var itemId = $(this).data('id');
    $('#itemid').val(itemId);
});

function addQty() {
    var qtyToAdd = $('#qtyToAdd').val();
    var itemId = $('#itemid').val();

    if (!qtyToAdd || !itemId) {
        alert('Please select an item.');
        return;
    }

    if (qtyToAdd < 0 || itemId < 0) {
        alert('Quantity or item ID cannot be less than zero.');
        return;
    }

    $.ajax({
        url: '/Home/UpdateQty',
        type: 'POST',
        data: { itemId: itemId, qtyToAdd: qtyToAdd },
        success: function (response) {

            document.getElementById('addQtyFields').style.display = 'inline';
            document.getElementById('previousLink').style.display = 'inline';
            $.ajax({
                url: '/Home/GetProduct',
                type: 'GET',
                success: function (response) {
                    var tbody = $('.inventry-table tbody');
                    tbody.empty();
                    var zeroQtyItems = [];
                    var nonzeroQtyItems = [];

                    for (var i = 0; i < response.length; i++) {
                        var item = response[i];
                        var row = $('<tr></tr>');
                        row.addClass('table-row');
                        row.attr('data-id', item.id);
                        row.attr('data-qty', item.qty);
                        var idCell = $('<td></td>').text(item.id);
                        var itemCell = $('<td></td>').text(item.itemName);
                        var qtyCell = $('<td></td>').text(item.qty);
                        var locationCell = $('<td></td>').text(item.location);
                        var areaCell = $('<td></td>').text(item.area);
                        var statusCell = $('<td></td>').text(item.status);
                        row.append(idCell, itemCell, qtyCell, locationCell, areaCell, statusCell);
                        if (item.qty === 0) {
                            zeroQtyItems.push(row);
                        } else {
                            nonzeroQtyItems.push(row);
                        }
                    }
                    tbody.append(nonzeroQtyItems);
                    for (var j = 0; j < zeroQtyItems.length; j++) {
                        tbody.append(zeroQtyItems[j]);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to make the AJAX call:', error);
                }
            });

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            if (xhr.status === 404) {
                alert('Item not found.');
            } else {
                alert('An error occurred while updating quantity.');
            }
        }
    });
}

function RemoveQty() {

    var qtyToRemove = $('#qtyToRemove').val();
    var itemId = $('#itemid').val();


    if (!qtyToRemove || !itemId) {
        alert('Please select an item.');
        return;
    }

    if (qtyToRemove < 0 || itemId < 0) {
        alert('Quantity or item ID cannot be less than zero.');
        return;
    }
    $.ajax({
        url: '/Home/RemoveQt',
        type: 'POST',
        data: { itemId: itemId, qtyToRemove: qtyToRemove },
        success: function (response) {
            document.getElementById('RemoveQtyFields').style.display = 'inline';
            document.getElementById('previousLink').style.display = 'inline';
            if (response === false) {
                alert('Quantity to remove exceeds available quantity.');
            } else {
                $.ajax({
                    url: '/Home/GetProduct',
                    type: 'GET',
                    success: function (response) {
                        var tbody = $('.inventry-table tbody');
                        tbody.empty();
                        var zeroQtyItems = [];
                        var nonzeroQtyItems = [];

                        for (var i = 0; i < response.length; i++) {
                            var item = response[i];
                            var row = $('<tr></tr>');
                            row.addClass('table-row');
                            row.attr('data-id', item.id);
                            row.attr('data-qty', item.qty);
                            var idCell = $('<td></td>').text(item.id);
                            var itemCell = $('<td></td>').text(item.itemName);
                            var qtyCell = $('<td></td>').text(item.qty);
                            var locationCell = $('<td></td>').text(item.location);
                            var areaCell = $('<td></td>').text(item.area);
                            var statusCell = $('<td></td>').text(item.status);
                            row.append(idCell, itemCell, qtyCell, locationCell, areaCell, statusCell);
                            if (item.qty === 0) {
                                zeroQtyItems.push(row);
                            } else {
                                nonzeroQtyItems.push(row);
                            }
                        }
                        tbody.append(nonzeroQtyItems);
                        for (var j = 0; j < zeroQtyItems.length; j++) {
                            tbody.append(zeroQtyItems[j]);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Failed to make the AJAX call:', error);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            if (xhr.status === 404) {
                alert('Item not found.');
            } else {
                alert('An error occurred while updating quantity.');
            }
        }
    });
}

function EditStatus() {
    var EditQntyRemove = $('#EditQntyRemove').val();
    var itemId = $('#itemid').val();
    var selectedStatus = $('#EdditstatusSelect').val();

    if (!itemId || itemId.trim() === "") {
        alert('Please select an item.');
        return;
    }

    $.ajax({
        url: '/Home/EditStatus',
        type: 'POST',
        data: { itemId: itemId, EditQntyRemove: EditQntyRemove, selectedStatus: selectedStatus },
        success: function (response) {
            document.getElementById('EditStatusFields').style.display = 'inline';
            document.getElementById('previousLink').style.display = 'inline';
            if (response === false) {
                alert('Quantity to remove exceeds available quantity.');
            } else {
                $.ajax({
                    url: '/Home/GetProduct',
                    type: 'GET',
                    success: function (response) {
                        var tbody = $('.inventry-table tbody');
                        tbody.empty();
                        var zeroQtyItems = [];
                        var nonzeroQtyItems = [];
                        for (var i = 0; i < response.length; i++) {
                            var item = response[i];
                            var row = $('<tr></tr>');
                            row.addClass('table-row');
                            row.attr('data-id', item.id);
                            row.attr('data-qty', item.qty);
                            var idCell = $('<td></td>').text(item.id);
                            var itemCell = $('<td></td>').text(item.itemName);
                            var qtyCell = $('<td></td>').text(item.qty);
                            var locationCell = $('<td></td>').text(item.location);
                            var areaCell = $('<td></td>').text(item.area);
                            var statusCell = $('<td></td>').text(item.status);
                            row.append(idCell, itemCell, qtyCell, locationCell, areaCell, statusCell);

                            if (item.qty === 0) {
                                zeroQtyItems.push(row);
                            } else {
                                nonzeroQtyItems.push(row);
                            }
                        }
                        tbody.append(nonzeroQtyItems);
                        for (var j = 0; j < zeroQtyItems.length; j++) {
                            tbody.append(zeroQtyItems[j]);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Failed to make the AJAX call:', error);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            if (xhr.status === 404) {
                alert('Item not found.');
            } else {
                alert('An error occurred while updating quantity.');
            }
        }
    });
}

var selectedItemId;

$('.inventry-table').on('click', '.table-row', function () {
    selectedItemId = $(this).data('id');
});

function MoveQty() {
    if (!selectedItemId) {
        alert('Please select an item.');
        return;
    }
    var form = document.createElement('form');
    form.method = 'GET';
    form.action = '/Home/MoveQty';
    var itemIdInput = document.createElement('input');
    itemIdInput.type = 'hidden';
    itemIdInput.name = 'itemId';
    itemIdInput.value = selectedItemId;
    form.appendChild(itemIdInput);
    document.body.appendChild(form);
    form.submit();
}

function searchItems() {
    var id = document.getElementById('idInput').value;
    var itemName = document.getElementById('itemNameInput').value;
    var location = document.getElementById('locationInput').value;
    var status = document.getElementById('statusSelect').value;
    var qtyMin = document.getElementById('qtyMinInput').value;
    var qtyMax = document.getElementById('qtyMaxInput').value;
    $.ajax({
        url: '/Home/SearchProduct',
        method: 'POST',
        data: {
            id: id,
            itemName: itemName,
            location: location,
            status: status,
            qtyMin: qtyMin,
            qtyMax: qtyMax
        },
        success: function (response) {
            var tbody = $('.inventry-table tbody');
            tbody.empty();
            var zeroQtyItems = [];
            var nonzeroQtyItems = [];
            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                var row = $('<tr></tr>');
                row.addClass('table-row');
                row.attr('data-id', item.id);
                row.attr('data-qty', item.qty);
                var idCell = $('<td></td>').text(item.id);
                var itemCell = $('<td></td>').text(item.itemName);
                var qtyCell = $('<td></td>').text(item.qty);
                var locationCell = $('<td></td>').text(item.location);
                var areaCell = $('<td></td>').text(item.area);
                var statusCell = $('<td></td>').text(item.status);
                row.append(idCell, itemCell, qtyCell, locationCell, areaCell, statusCell);
                if (item.qty === 0) {
                    zeroQtyItems.push(row);
                } else {
                    nonzeroQtyItems.push(row);
                }
            }
            tbody.append(nonzeroQtyItems);
            for (var j = 0; j < zeroQtyItems.length; j++) {
                tbody.append(zeroQtyItems[j]);
            }
        },

        error: function (error) {

            console.log(error);
        }
    });
}