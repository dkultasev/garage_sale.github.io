
// Constants for pagination
const PRODUCTS_PER_PAGE = 20;
var currentPage = 1;
var totalPages = Math.ceil(productsData.length / PRODUCTS_PER_PAGE);

// Function to render a product card
function renderProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.img[0]}" alt="${product.name}">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-price">${product.price} USD</p>
        </div>
    `;
}

// Function to render products for the current page
function renderProducts() {
    var startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    var endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, productsData.length);
    var productsToRender = productsData.slice(startIndex, endIndex);
    
    var productsHTML = productsToRender.map(renderProductCard).join('');
    document.getElementById('products-container').innerHTML = productsHTML;
    
    // Update page info
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
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
