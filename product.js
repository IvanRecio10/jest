let products = [];
let id = 0;

function resetProducts() {
    products = [];
    id = 0;
}

function getProducts() {
    return products;
}

function addProduct(name, price) {
    if (!name || !price) {
        throw new Error("Name and price are required.");
    }
    const existingProduct = products.find(product => product.name === name);
    if (existingProduct) {
        throw new Error("Product already exists.");
    }
    products.push({ id: id++, name, price });
}

function removeProduct(productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        throw new Error("Product not found.");
    }
    products.splice(index, 1);
}

function getProduct(productId) {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error("Product not found.");
    }
    return product;
}

function updateProduct(productId, name, price) {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error("Product not found.");
    }
    if (name) product.name = name;
    if (price) product.price = price;
}

module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct };
