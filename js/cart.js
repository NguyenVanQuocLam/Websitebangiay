document.addEventListener('DOMContentLoaded', function() {
    const cartTable = document.querySelector('.cart-content-left table');
    const proceedButton = document.querySelector('.cart-content-right-button a[href="delivery.html"] button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        if (cart.length > 0) {
            cart.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td><p>${item.name}</p></td>
                    <td><p>${item.selectedSize}</p></td>
                    <td><input type="number" value="${item.quantity}" min="1" class="quantity-input"></td>
                    <td><p>${(item.price * item.quantity).toLocaleString('vi-VN')}</td>
                    <td><span class="remove-item" data-id="${item.id}" data-size="${item.selectedSize}">x</span></td>
                `;
                
                cartTable.appendChild(row);
            });

            updateCartTotal();
        } else {
            cartTable.innerHTML = `<tr><td colspan="6">Giỏ hàng của bạn đang trống</td></tr>`;
        }
    }

    function updateCartTotal() {
        const cartTotalElement = document.querySelector('.cart-content-right table');
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotalElement.querySelector('tr:nth-child(3) td p').textContent = total.toLocaleString('vi-VN');
        cartTotalElement.querySelector('tr:nth-child(4) td p').textContent = total.toLocaleString('vi-VN');
    }

    proceedButton.addEventListener('click', function(event) {
        if (cart.length === 0) {
            event.preventDefault();  // Ngăn không cho chuyển sang trang tiếp theo
            alert('Hãy thêm sản phẩm vào giỏ hàng trước khi tiếp tục thanh toán.');
        }
    });

    // Update total when quantity changes
    cartTable.addEventListener('input', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(event.target.value, 10);
            const row = event.target.closest('tr');
            const productId = row.querySelector('.remove-item').getAttribute('data-id');
            const selectedSize = row.querySelector('.remove-item').getAttribute('data-size');

            const cartIndex = cart.findIndex(item => item.id === productId && item.selectedSize === selectedSize);
            if (cartIndex >= 0) {
                cart[cartIndex].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                row.querySelector('td:nth-child(5) p').textContent = 
                    (cart[cartIndex].price * newQuantity).toLocaleString('vi-VN');
                updateCartTotal();
            }
        }
    });

    // Remove item from cart and update total
    cartTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            const selectedSize = event.target.getAttribute('data-size');

            cart = cart.filter(item => !(item.id === productId && item.selectedSize === selectedSize));
            localStorage.setItem('cart', JSON.stringify(cart));
            event.target.closest('tr').remove();
            updateCartTotal();
        }
    });

    displayCartItems();
});
