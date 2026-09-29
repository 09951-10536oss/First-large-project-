// ฟังก์ชันสร้าง Toast แจ้งเตือนสีเขียวขยับได้
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
    renderProducts();
    setupFilters();
    setupSearch();
});

function renderProducts(category = 'all', searchQuery = '') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let products = typeof getProducts === 'function' ? getProducts() : [
        { id: '1', name: 'Quantum Sound Pro', price: 4990, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', desc: 'หูฟังไร้สายระดับพรีเมียม' },
        { id: '2', name: 'Apex Mechanical Keyboard', price: 3590, category: 'Gaming', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', desc: 'คีย์บอร์ดเกมมิ่งตอบสนองรวดเร็ว' },
        { id: '3', name: 'UltraView 4K Monitor', price: 12900, category: 'Display', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', desc: 'จอมอนิเตอร์คมชัดระดับ 4K' }
    ];

    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }

    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q)));
    }

    if (products.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">ไม่พบสินค้าที่ค้นหา</div>`;
        return;
    }

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" class="product-img" onclick="viewProduct('${p.id}')">
            <div class="product-info">
                <span class="category-badge">${p.category}</span>
                <h3 class="product-title" onclick="viewProduct('${p.id}')">${p.name}</h3>
                <div class="product-price">฿${p.price.toLocaleString()}</div>
                <button class="btn btn-primary" onclick="addToCart('${p.id}')">เพิ่มลงตะกร้า</button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.dataset.category || 'all';
            const searchInput = document.getElementById('search-input');
            renderProducts(cat, searchInput ? searchInput.value : '');
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const activeBtn = document.querySelector('.filter-btn.active');
        const cat = activeBtn ? (activeBtn.dataset.category || 'all') : 'all';
        renderProducts(cat, e.target.value);
    });
}

function addToCart(productId) {
    let products = typeof getProducts === 'function' ? getProducts() : [
        { id: '1', name: 'Quantum Sound Pro', price: 4990, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
        { id: '2', name: 'Apex Mechanical Keyboard', price: 3590, category: 'Gaming', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
        { id: '3', name: 'UltraView 4K Monitor', price: 12900, category: 'Display', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' }
    ];

    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    const item = cart.find(c => c.id === productId);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    if (typeof updateCartCount === 'function') updateCartCount();
    
    showToast(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
}

function viewProduct(id) {
    window.location.href = `product-detail.html?id=${id}`;
        }
                                         
