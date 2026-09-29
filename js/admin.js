document.addEventListener('DOMContentLoaded', () => {
    renderInventory();
    renderOrders();
    updateMetrics();
});

function renderInventory() {
    const tbody = document.getElementById('inventoryTable');
    if(!tbody) return;
    const products = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) || [];
    tbody.innerHTML = products.map(p => `
        <tr>
            <td>${p.name}</td>
            <td><span class="badge">${p.category}</span></td>
            <td>฿${p.price.toLocaleString()}</td>
            <td>${p.stock} ชิ้น</td>
            <td><button class="btn btn-danger" onclick="deleteProduct('${p.id}')">ลบ</button></td>
        </tr>
    `).join('');
}

function renderOrders() {
    const tbody = document.getElementById('ordersTable');
    if(!tbody) return;
    tbody.innerHTML = INITIAL_ORDERS.map(o => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.date}</td>
            <td>฿${o.total.toLocaleString()}</td>
            <td><span class="badge">${o.status}</span></td>
        </tr>
    `).join('');
}

function updateMetrics() {
    const rev = document.getElementById('revenueMetric');
    if(rev) rev.textContent = '฿20,780';
    const ord = document.getElementById('ordersMetric');
    if(ord) ord.textContent = INITIAL_ORDERS.length;
    const stk = document.getElementById('stockMetric');
    if(stk) {
        const products = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) || [];
        stk.textContent = products.reduce((sum, p) => sum + p.stock, 0);
    }
}

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    renderInventory();
}
  
