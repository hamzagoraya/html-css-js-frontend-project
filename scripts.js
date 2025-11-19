document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.querySelectorAll('.category-bar a');
    const productContainer = document.querySelector('.product-list');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');

    const products = {
        'Keyboards': [
            { id: 'keyboard1', name: 'Mechanical Keyboard', price: 49.99, description: 'A high-quality mechanical keyboard.', image: 'mechanical-keyboard.png' },
            { id: 'keyboard2', name: 'Wireless Keyboard', price: 29.99, description: 'Compact, wireless keyboard.', image: 'wireless-keyboard.png' },
            { id: 'keyboard3', name: 'RGB Gaming Keyboard', price: 89.99, description: 'RGB keyboard with customizable lighting.', image: 'rgb-keyboard.png' }
        ],
        'Mouse': [
            { id: 'mouse1', name: 'Wireless Mouse', price: 19.99, description: 'Smooth, wireless mouse.', image: 'wireless-mouse.png' },
            { id: 'mouse2', name: 'Gaming Mouse', price: 39.99, description: 'High-precision gaming mouse.', image: 'gaming-mouse.png' },
            { id: 'mouse3', name: 'Ergonomic Mouse', price: 24.99, description: 'Designed for comfort.', image: 'ergonomic-mouse.png' }
        ],
     'Monitors': [
    { id: 'monitor1', name: '27" Full HD Monitor', price: 159.99, description: '1080p LED monitor with 75Hz refresh rate and ultra-thin bezels.', image: 'monitor-27hd.png' },
    { id: 'monitor2', name: '32" Curved Gaming Monitor', price: 249.99, description: 'Curved 2K display for immersive gaming and crystal-clear visuals.', image: 'monitor-curved.png' },
    { id: 'monitor3', name: '24" IPS Office Monitor', price: 129.99, description: 'IPS panel for accurate colors and wide viewing angles.', image: 'monitor-ips.png' }
  ],

  'GPUs': [
    { id: 'gpu1', name: 'NVIDIA RTX 5080', price: 379.99, description: 'Powerful GPU with real-time ray tracing and AI performance boost.', image: 'gpu1.png' },
    { id: 'gpu2', name: 'NVIDIA RTX 5060 Ti', price: 699.99, description: 'Ultra-fast gaming graphics card with 12GB GDDR6X memory.', image: 'gpu2.png' },
    { id: 'gpu3', name: 'AMD RX 9070 XT', price: 499.99, description: 'High-performance AMD GPU optimized for 1440p gaming.', image: 'gpu3.png' }
  ],

  'Processors': [
    { id: 'cpu1', name: 'AMD Ryzen 9 7950X', price: 289.99, description: 'Hybrid architecture with 14 cores and excellent gaming performance.', image: 'cpu1.png' },
    { id: 'cpu2', name: 'AMD Ryzen 9 9950X', price: 429.99, description: '16-core CPU for gaming and productivity tasks.', image: 'cpu2.png' },
    { id: 'cpu3', name: 'Intel Core i9-12900KF', price: 449.99, description: 'Top-tier gaming processor with 3D V-Cache technology.', image: 'cpu3.png' }
  ],

  'Headphones': [
    { id: 'headphone1', name: 'Wireless Bluetooth Headphones', price: 59.99, description: 'Comfortable wireless headphones with deep bass and noise isolation.', image: 'h1.png' },
    { id: 'headphone2', name: 'Gaming Headset with Mic', price: 79.99, description: 'Surround sound headset with adjustable RGB lights and noise-canceling mic.', image: 'h2.png' },
    { id: 'headphone3', name: 'Studio Headphones', price: 99.99, description: 'Crystal-clear audio for music production and high-end listening.', image: 'h3.png' }
  ],

  'Gaming Chairs': [
    { id: 'chair1', name: 'Ergo Gaming Chair', price: 149.99, description: 'Adjustable ergonomic chair with lumbar support and headrest.', image: 'c1.png' },
    { id: 'chair2', name: 'Racer Series Gaming Chair', price: 199.99, description: 'Sporty design with reclining backrest and footrest.', image: 'c2.png' },
    { id: 'chair3', name: 'Pro Series Chair', price: 249.99, description: 'Premium comfort with memory foam padding and 4D armrests.', image: 'c3.png' }
  ],

  'Build Case': [
    { id: 'case1', name: 'ATX Mid Tower Case', price: 89.99, description: 'Tempered glass side panel and RGB fans included.', image: 'case1.png' },
    { id: 'case2', name: 'Mini ITX Compact Case', price: 69.99, description: 'Compact design for small builds, efficient airflow.', image: 'case2.png' },
    { id: 'case3', name: 'Full Tower Case', price: 119.99, description: 'Spacious design for high-end builds with water cooling.', image: 'case3.png' }
  ]
    };

    // 🛒 Display products by category
    function displayProducts(category) {
        productContainer.innerHTML = '';

        const categoryProducts = products[category];
        if (!categoryProducts) {
            productContainer.innerHTML = '<p>No products in this category.</p>';
            return;
        }

        categoryProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="images/${product.image}" alt="${product.name}" class="product-image"/>
                    <div class="product-details">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productElement);
        });

        attachAddToCartEvents();
    }

    // 🧭 Category Click
    categoryList.forEach(category => {
        category.addEventListener('click', e => {
            e.preventDefault();
            displayProducts(e.target.textContent.trim());
            scrollToProducts();
        });
    });

    // 🔍 Search functionality (auto scroll + Enter key)
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        productContainer.innerHTML = '';

        let found = false;
        for (const category in products) {
            products[category].forEach(product => {
                if (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                ) {
                    found = true;
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');
                    productElement.innerHTML = `
                        <div class="product-card" data-product-id="${product.id}">
                            <img src="images/${product.image}" alt="${product.name}" class="product-image"/>
                            <div class="product-details">
                                <h3>${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                                <button class="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    `;
                    productContainer.appendChild(productElement);
                }
            });
        }

        if (!found) {
            productContainer.innerHTML = '<p>No products found.</p>';
        } else {
            attachAddToCartEvents();

            // 🟢 Auto-scroll to first result
            setTimeout(() => {
                const firstProduct = document.querySelector('.product-card');
                if (firstProduct) {
                    firstProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 200);
        }
    }

    // Search button click
    searchButton.addEventListener('click', performSearch);

    // Pressing Enter triggers search
    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Scroll helper for category view
    function scrollToProducts() {
        window.scrollTo({
            top: productContainer.offsetTop - 50,
            behavior: 'smooth'
        });
    }

    // 🛒 Add to Cart Logic
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === product.id);

        if (existing) existing.quantity += 1;
        else cart.push({ ...product, quantity: 1 });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function attachAddToCartEvents() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', e => {
                const card = e.target.closest('.product-card');
                const product = {
                    id: card.dataset.productId,
                    name: card.querySelector('h3').innerText,
                    price: parseFloat(card.querySelector('.product-price').innerText.replace('$', '')),
                    image: card.querySelector('.product-image').src
                };
                addToCart(product);
            });
        });
    }

    // 🧮 Update Cart Count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-item-count').innerText = count;
    }

    updateCartCount(); // Initial load
});
