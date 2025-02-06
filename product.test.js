const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe("Adding Products", () => {
    it("should add a product", () => {
        addProduct("Apple", 1.5);
        const products = getProducts();
        expect(products.length).toBe(1);
        expect(products[0].name).toBe("Apple");
        expect(products[0].price).toBe(1.5);
    });

    it("should increment the id when adding a product", () => {
        addProduct("Apple", 1.5);
        addProduct("Banana", 0.75);
        const products = getProducts();
        expect(products[1].id).toBe(1);
    });

    it("should throw an error if name or price are not defined", () => {
        expect(() => addProduct(undefined, 1.5)).toThrow("Name and price are required.");
        expect(() => addProduct("Apple")).toThrow("Name and price are required.");
    });

    it("should throw an error if the product already exists", () => {
        addProduct("Apple", 1.5);
        expect(() => addProduct("Apple", 1.5)).toThrow("Product already exists.");
    });
});

describe("Removing Products", () => {
    it("should remove a product", () => {
        addProduct("Apple", 1.5);
        addProduct("Banana", 0.75);
        removeProduct(0);
        const products = getProducts();
        expect(products.length).toBe(1);
        expect(products[0].name).toBe("Banana");
    });

    it("should throw an error if the product does not exist", () => {
        expect(() => removeProduct(0)).toThrow("Product not found.");
    });
});

describe("Getting a single product", () => {
    it("should get a product by its id", () => {
        addProduct("Apple", 1.5);
        const product = getProduct(0);
        expect(product.name).toBe("Apple");
        expect(product.price).toBe(1.5);
    });

    it("should throw an error if the product does not exist", () => {
        expect(() => getProduct(0)).toThrow("Product not found.");
    });
});

describe("Updating Products", () => {
    it("should update a product by its id", () => {
        addProduct("Apple", 1.5);
        updateProduct(0, "Green Apple", 2.0);
        const product = getProduct(0);
        expect(product.name).toBe("Green Apple");
        expect(product.price).toBe(2.0);
    });

    it("should throw an error if the product does not exist", () => {
        expect(() => updateProduct(0, "Banana", 1.0)).toThrow("Product not found.");
    });

    it("should only update the price", () => {
        addProduct("Apple", 1.5);
        updateProduct(0, undefined, 2.0);
        const product = getProduct(0);
        expect(product.name).toBe("Apple");
        expect(product.price).toBe(2.0);
    });

    it("should only update the name", () => {
        addProduct("Apple", 1.5);
        updateProduct(0, "Green Apple");
        const product = getProduct(0);
        expect(product.name).toBe("Green Apple");
        expect(product.price).toBe(1.5);
    });
});
