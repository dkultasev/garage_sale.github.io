
// Constants for pagination
const PRODUCTS_PER_PAGE = 20;
var currentPage = 1;
var totalPages = Math.ceil(productsData.length / PRODUCTS_PER_PAGE);

// Function to render a product card
function renderProductCard(product) {
    var productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.img[0]}" alt="${product.name}">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-price">${product.price} USD</p>
    `;
    productCard.addEventListener('click', function() {
        openModal(product);
    });
    return productCard;
}

// Function to render products for the current page
function renderProducts() {
    var startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    var endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, productsData.length);
    var productsToRender = productsData.slice(startIndex, endIndex);
    
    var productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        productsContainer.appendChild(renderProductCard(product));
    });
    
    // Update page info
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to open the modal with product details
function openModal(product) {
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = product.price + ' USD';
    document.getElementById('modal-description').textContent = product.description;
    var modalImagesContainer = document.getElementById('modal-images');
    modalImagesContainer.innerHTML = '';
    product.img.forEach(img => {
        var imgElement = document.createElement('img');
        imgElement.src = img;
        modalImagesContainer.appendChild(imgElement);
    });
    document.getElementById('product-modal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Function to change the page (next or previous)
function changePage(direction) {
    currentPage += direction;
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    renderProducts();
}

// Initial rendering of products
window.onload = function() {
    renderProducts();
};

// Function to render product details in the modal
function renderProductDetails(product) {
    var imagesHTML = product.img.map(img => `<img src="${img}" alt="${product.name}">`).join('');
    var detailsHTML = `
        <h2>${product.name}</h2>
        <p class="product-price">${product.price} USD</p>
        <div class="product-images">${imagesHTML}</div>
        <p class="product-description">${product.description}</p>
    `;
    document.getElementById('product-details').innerHTML = detailsHTML;
}

// Function to open the modal with product details
function openProductModal(productId) {
    var product = productsData.find(p => p.id === productId);
    renderProductDetails(product);
    document.getElementById('product-modal').style.display = "block";
}

// Function to close the modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('product-modal').style.display = "none";
};

// Update the renderProductCard function to add click event for opening modal
function renderProductCard(product) {
    return `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <img src="${product.img[0]}" alt="${product.name}">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-price">${product.price} USD</p>
        </div>
    `;
}
