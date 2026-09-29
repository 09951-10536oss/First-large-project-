document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    renderProducts(getProducts());
    updateCartBadge();

    const search = document.getElementById('searchInput');
    if(search) {
        search.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = getProducts().filter(p => p.name.toLowerCase().includes(query));
            renderProducts(filtered);
        });
    }
});

function initProducts() {
    if(!localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) {
        localStorage.setItem(CONFIG.STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
}

function getProducts() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS)) || [];
}

function renderProducts(items) {
    const container = document.getElementById('productContainer');
    if(!container) return;
    container.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="info">
                <div>
                    <span class="badge">${p.category}</span>
                    <h3 style="margin: 0.5rem 0;">${p.name}</h3>
                </div>
                <div>
                    <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent);">${CONFIG.CURRENCY_SYMBOL}${p.price.toLocaleString()}</p>
                    <button class="btn btn-primary w-100" style="margin-top: 0.5rem;" onclick="addToCart('${p.id}')">เพิ่มลงตะกร้า</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(cat) {
    const all = getProducts();
    if(cat === 'all') renderProducts(all);
    else renderProducts(all.filter(p => p.category === cat));
}
