// 🛒 Display Cart Items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '0.00';
        return;
    }

    let cartHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" width="100">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="decrease">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item">Remove</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    totalPriceElement.textContent = totalPrice.toFixed(2);

    attachCartEvents();
}

// 🧩 Handle quantity buttons & remove
function attachCartEvents() {
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', e => {
            const productId = e.target.closest('.cart-item').dataset.id;
            updateQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', e => {
            const productId = e.target.closest('.cart-item').dataset.id;
            updateQuantity(productId, -1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', e => {
            const productId = e.target.closest('.cart-item').dataset.id;
            removeFromCart(productId);
        });
    });
}

// ➕➖ Update Quantity
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// ❌ Remove Item
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// 🧾 Checkout Form
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    const checkoutForm = document.getElementById('checkout-form');
    const clearCartButton = document.getElementById('clear-cart');

    // ✅ Handle Checkout Submission
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('full-name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !address || !phone) {
            alert('Please fill in all fields before placing your order.');
            return;
        }

        alert(`🎉 Thank you, ${name}! Your order has been placed successfully.`);

        localStorage.removeItem('cart');
        checkoutForm.reset();
        displayCartItems();
    });

    // 🧹 Clear Cart Button
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                localStorage.removeItem('cart');
                displayCartItems();
            }
        });
    }
});
