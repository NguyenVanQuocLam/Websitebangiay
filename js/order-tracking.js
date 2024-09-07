document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Find all orders for the customer
    const customerOrders = orders.filter(order => order.name === name && order.phone === phone);

    if (customerOrders.length > 0) {
        displayOrderDetails(customerOrders);
    } else {
        alert('Không tìm thấy đơn hàng phù hợp.');
    }
});

function displayOrderDetails(customerOrders) {
    const orderDetailsSection = document.getElementById('order-list'); // Target the correct element
    orderDetailsSection.innerHTML = ''; // Clear any previous results

    // Iterate over each order and display them
    customerOrders.forEach((order, index) => {
        const totalAmount = order.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create a section for each order
        const orderHeader = document.createElement('h3');
        orderHeader.textContent = `Đơn hàng #${index + 1} - Tổng giá trị: ${totalAmount.toLocaleString('vi-VN')}đ - Tình trạng: ${order.status}`;
        orderDetailsSection.appendChild(orderHeader);

        // Create a table for the products in the order
        const orderTable = document.createElement('table');
        orderTable.innerHTML = `
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Size</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        
        const orderTableBody = orderTable.querySelector('tbody');

        // Display products for the current order
        order.cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 80px;"></td>
                <td>${item.name}</td>
                <td>${item.selectedSize}</td>
                <td>${item.quantity}</td>
                <td>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
            `;
            orderTableBody.appendChild(row);
        });

        orderDetailsSection.appendChild(orderTable);
    });

    // Show the order details section
    document.getElementById('order-details').style.display = 'block';
}
