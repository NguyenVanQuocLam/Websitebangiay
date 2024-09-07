document.getElementById('checkout-button').addEventListener('click', function() {
    const fullName = document.getElementById('full-name');
    const phone = document.getElementById('phone');  // Added phone field to capture customer phone
    const email = document.getElementById('email');
    const city = document.getElementById('city');
    const district = document.getElementById('district');
    const ward = document.getElementById('ward');
    const address = document.getElementById('address');

    // Validate all input fields
    if (!fullName.value.trim()) {
        alert('Vui lòng nhập họ tên hợp lệ.');
        fullName.focus();
        return;
    }
    if (!phone.value.trim()) {  // Phone validation added
        alert('Vui lòng nhập số điện thoại hợp lệ.');
        phone.focus();
        return;
    }
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Vui lòng nhập địa chỉ email hợp lệ.');
        email.focus();
        return;
    }
    if (!city.value.trim()) {
        alert('Vui lòng nhập tỉnh/thành phố hợp lệ.');
        city.focus();
        return;
    }
    if (!district.value.trim()) {
        alert('Vui lòng nhập quận/huyện hợp lệ.');
        district.focus();
        return;
    }
    if (!ward.value.trim()) {
        alert('Vui lòng nhập phường/xã hợp lệ.');
        ward.focus();
        return;
    }
    if (!address.value.trim()) {
        alert('Vui lòng nhập địa chỉ hợp lệ.');
        address.focus();
        return;
    }

    // Create order object and save to localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get cart from localStorage
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống.');
        return;
    }

    // Store the order
    const order = {
        name: fullName.value.trim(),
        phone: phone.value.trim(),  // Phone added to the order object
        email: email.value.trim(),
        address: `${address.value.trim()}, ${ward.value.trim()}, ${district.value.trim()}, ${city.value.trim()}`,
        cart: cart,
        status: 'Chờ xác nhận'  // Initial status of the order
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Display payment methods and order total
    document.getElementById('payment-methods-right').style.display = 'block';
    const orderTotal = calculateOrderTotal();
    document.getElementById('order-total').textContent = orderTotal.toLocaleString('vi-VN');
    document.getElementById('success-message').style.display = 'none';
});

document.getElementById('bank-transfer').addEventListener('change', function() {
    document.getElementById('qr-code').style.display = 'block';
});

document.getElementById('cash').addEventListener('change', function() {
    document.getElementById('qr-code').style.display = 'none';
});

document.getElementById('pay-button').addEventListener('click', function() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (paymentMethod) {
        document.getElementById('checkout-button').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        localStorage.removeItem('cart');  // Remove cart after successful payment
    } else {
        alert('Vui lòng chọn phương thức thanh toán.');
    }
});

// Calculate the total order value
function calculateOrderTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
