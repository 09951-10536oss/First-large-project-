// ฟังก์ชันสร้าง Toast แจ้งเตือนดึ๋งๆ สีเขียว
function showToast(message) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: #94a3b8;">ไม่มีสินค้าในตะกร้า</td></tr>`;
        updateSummary(0);
        return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map((item, index) => {
        const total = item.price * item.qty;
        subtotal += total;
        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${item.image}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>฿${item.price.toLocaleString()}</td>
                <td>
                    <input type="number" value="${item.qty}" min="1" style="width:60px; padding:4px; text-align:center;" onchange="changeQty(${index}, this.value)">
                </td>
                <td>฿${total.toLocaleString()}</td>
                <td><button class="btn btn-danger" style="padding:4px 8px; font-size:12px;" onclick="removeItem(${index})">ลบ</button></td>
            </tr>
        `;
    }).join('');

    updateSummary(subtotal);
}

function changeQty(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    const qty = parseInt(newQty);
    if (qty > 0) {
        cart[index].qty = qty;
        localStorage.setItem('nexus_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    
    // ใช้ showToast แทน alert
    showToast(`ลบ "${removedItem.name}" ออกแล้ว`);
}

function updateSummary(subtotal) {
    const subtotalEl = document.getElementById('subtotal');
    const vatEl = document.getElementById('vat');
    const totalEl = document.getElementById('total');

    const vat = subtotal * 0.07;
    const total = subtotal + vat;

    if (subtotalEl) subtotalEl.textContent = `฿${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    if (vatEl) vatEl.textContent = `฿${vat.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    if (totalEl) totalEl.textContent = `฿${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    if (cart.length === 0) {
        showToast('ไม่มีสินค้าในตะกร้าครับ');
        return;
    }

    // ใช้ showToast แทน alert
    showToast('ขอบคุณสำหรับคำสั่งซื้อ!');
    localStorage.removeItem('nexus_cart');
    
    setTimeout(() => {
        renderCart();
        updateCartCount();
    }, 1500);
        }
