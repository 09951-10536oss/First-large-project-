function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function getCart() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_CART)) || [];
}

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) || [];
    const product = products.find(p => p.id === productId);
    if(!product) return;

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if(existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem(CONFIG.STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartBadge();
    alert('เพิ่มสินค้าลงตะกร้าแล้ว!');
}

function updateCartBadge() {
    const badge = document.getElementById('cartCount');
    if(badge) {
        const cart = getCart();
        badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.getElementById('cartItems');
    if(cartTable) renderCart();
});

function renderCart() {
    const cart = getCart();
    const cartTable = document.getElementById('cartItems');
    if(!cartTable) return;

    let subtotal = 0;
    cartTable.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        return `
            <tr>
                <td>${item.name}</td>
                <td>฿${item.price.toLocaleString()}</td>
                <td>${item.qty}</td>
                <td>฿${itemTotal.toLocaleString()}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart('${item.id}')">ลบ</button></td>
            </tr>
        `;
    }).join('');

    const tax = subtotal * 0.07;
    document.getElementById('subtotal').textContent = `฿${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `฿${tax.toLocaleString()}`;
    document.getElementById('grandTotal').textContent = `฿${(subtotal + tax).toLocaleString()}`;
}

function removeFromCart(id) {
    let cart = getCart().filter(i => i.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEY_CART, JSON.stringify(cart));
    renderCart();
    updateCartBadge();
}

function checkout() {
    alert('ขอบคุณสำหรับคำสั่งซื้อ!');
    localStorage.removeItem(CONFIG.STORAGE_KEY_CART);
    window.location.href = 'index.html';
                         }
      
