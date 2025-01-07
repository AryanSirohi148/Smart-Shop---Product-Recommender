// Product data
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Apple Watch Series 7",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Nike Air Zoom Pegasus 38",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        category: "Sports"
    },
    {
        id: 4,
        name: "Herschel Little America Backpack",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        category: "Accessories"
    },
    {
        id: 5,
        name: "Breville Barista Express",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=800&q=80",
        category: "Home"
    },
    {
        id: 6,
        name: "MacBook Pro 14-inch",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        category: "Electronics"
    },
    {
        id: 7,
        name: "Kindle Paperwhite",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80",
        category: "Electronics"
    },
    {
        id: 8,
        name: "Lululemon Yoga Mat",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=800&q=80",
        category: "Sports"
    }
];

// Cart functionality
let cartItems = [];

function setupCart() {
    const dropZone = document.getElementById('cart-drop-zone');
    const modal = document.getElementById('cart-modal');
    const checkoutBtn = document.getElementById('checkout-btn');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const productId = e.dataTransfer.getData('text/plain');
        addToCart(parseInt(productId));
    });

    dropZone.addEventListener('click', () => {
        modal.style.display = 'block';
        updateCartDisplay();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase!');
        cartItems = [];
        updateCartDisplay();
        modal.style.display = 'none';
    });
}

function addToCart(productId) {
    const product = getProduct(productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: productId,
            quantity: 1,
            ...product
        });
    }

    updateCartCount();
}

function updateCartCount() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

// Product functionality
function setupProducts() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.draggable = true;
    div.dataset.productId = product.id;

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price.toFixed(2)}</p>
        </div>
    `;

    div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', product.id);
        div.classList.add('dragging');
    });

    div.addEventListener('dragend', () => {
        div.classList.remove('dragging');
    });

    return div;
}

function getProduct(id) {
    return products.find(p => p.id === parseInt(id));
}

function getAllProducts() {
    return [...products];
}

// Recommendations functionality
function setupRecommendations() {
    const container = document.getElementById('recommendations-grid');
    const recommendations = getRandomProducts(products, 3);
    
    recommendations.forEach(product => {
        const element = createRecommendationElement(product);
        container.appendChild(element);
    });
}

function getRandomProducts(products, count) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createRecommendationElement(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price.toFixed(2)}</p>
            <p class="recommendation-tag">Recommended for you</p>
        </div>
    `;
    
    return div;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const productsContainer = document.getElementById('products-container');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        updateProductDisplay(filteredProducts, productsContainer);
    });
}

function updateProductDisplay(products, container) {
    container.innerHTML = '';
    
    products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    setupProducts();
    setupCart();
    setupRecommendations();
    setupSearch();
});