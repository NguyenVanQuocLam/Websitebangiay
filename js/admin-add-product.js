document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the product details from the form inputs
    const name = document.getElementById('product-name').value.trim();
    const image = document.getElementById('product-image').value.trim();
    const sizes = document.getElementById('product-sizes').value.trim().split(',').map(size => size.trim()); // Split sizes by comma
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value.trim();

    // Check if all fields are filled correctly
    if (!name || !image || sizes.length === 0 || isNaN(price) || !description) {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm.');
        return;
    }

    // Ensure sizes are valid (if empty or wrong input, set it to an empty array)
    const validSizes = sizes.length > 0 && sizes[0] !== '' ? sizes : [];

    // Create a new product object
    const newProduct = {
        name: name,
        image: image,
        sizes: validSizes, // Ensure sizes are an array
        price: price,
        description: description
    };

    // Save the product to localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    // Clear the form after submission
    document.getElementById('add-product-form').reset();

    // Reload the product list
    loadProducts();
});

// Load products into the table
function loadProducts() {
    const productListTable = document.getElementById('product-list');
    productListTable.innerHTML = '';  // Clear the current list

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 80px;"></td>
            <td>${product.sizes.length > 0 ? product.sizes.join(', ') : 'Không có size'}</td>
            <td>${product.price.toLocaleString('vi-VN')}đ</td>
            <td>${product.description}</td>
        `;
        productListTable.appendChild(row);
    });
}

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);
