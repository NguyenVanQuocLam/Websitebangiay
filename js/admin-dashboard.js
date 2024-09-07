// Load products into the dashboard table
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Clear current product list

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 80px;"></td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString('vi-VN')}đ</td>
            <td>${product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : 'Không có size'}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct(${index})">Sửa</button>
                <button onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Edit a product
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    // Prompt for new details or redirect to a new product edit page
    const newName = prompt('Tên sản phẩm:', product.name);
    const newPrice = parseFloat(prompt('Giá sản phẩm:', product.price));

    if (newName && !isNaN(newPrice)) {
        products[index].name = newName;
        products[index].price = newPrice;
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

// Delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

// Load orders into the dashboard table
function loadOrders() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';  // Clear current order list

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach((order, index) => {
        const totalAmount = order.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${order.cart.map(item => item.name).join(', ')}</td>
            <td>${totalAmount.toLocaleString('vi-VN')}đ</td>
            <td>${order.status}</td>
            <td>
                <select onchange="updateOrderStatus(${index}, this.value)">
                    <option value="Chờ xác nhận" ${order.status === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
                    <option value="Đang đóng gói" ${order.status === 'Đang đóng gói' ? 'selected' : ''}>Đang đóng gói</option>
                    <option value="Đang vận chuyển" ${order.status === 'Đang vận chuyển' ? 'selected' : ''}>Đang vận chuyển</option>
                    <option value="Đã giao" ${order.status === 'Đã giao' ? 'selected' : ''}>Đã giao</option>
                    <option value="Đã hủy" ${order.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
        `;
        orderList.appendChild(row);
    });
}

// Update Order Status
function updateOrderStatus(index, newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders[index].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
}

// Initial load of products and orders
loadProducts();
loadOrders();
