let products =[];

function renderProducts(products) {
    let htmlStr = products.map(el => `<div class="col-3">
                                        <div class="card h-100 offcanvas-body">
                                            <img src="${el.thumbnail}" class="card-img-top navbar-collapse" alt="picture">
                                            <div class="card-body text-center">
                                                <h5 class="card-title">${el.brand}</h5>
                                                <p class="card-text">${el.description}</p>
                                                <h3 class="card-text text-primary fw-bold">${el.price}$</h3>
                                            </div>
                                        </div>
                                    </div>`).join('');
        document.getElementById('cards').innerHTML = htmlStr || `<div class="col-12 m-auto py-3"><h2 class="text-center">Product not found</h2></div>`;
}

function renderSelect(arr) {
    let htmlStr = `<option value="">Not Selected</option>`;
    htmlStr += arr.map(el => `<option value="${el}">${el}</option>`);
    document.getElementById('select').innerHTML = htmlStr;
    checkSelect();
}

function checkSelect() {
    document.getElementById('select').onchange = e => {
        let value = e.currentTarget.value;
        let selectProducts = products.filter(el => el.category === value);
        renderProducts(selectProducts);
    }
}

function getProducts() {
    fetch('https://dummyjson.com/products').then(res => res.json())
    .then(data => {
        products = data.products;
        renderProducts(products)
    });
}
function getCategories() {
    fetch('https://dummyjson.com/products/categories').then(res => res.json()).then(data => renderSelect(data));
}

window.onload = () => {
    getProducts();
    getCategories();
}