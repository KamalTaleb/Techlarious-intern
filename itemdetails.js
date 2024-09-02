document.addEventListener("DOMContentLoaded", () => {
    
    let productID = new URLSearchParams(window.location.search).get('id');
    console.log(`Product ID from URL: ${productID}`);
 
    async function loadData(productId) {
        try {
            const response = await fetch("products.json");
            if (!response.ok) {
                throw new Error(`Network response was not okay: ${response.statusText}`);
            }
            const data = await response.json();
            const products = data.products;

            if (!Array.isArray(products)) {
                throw new TypeError("Expected products to be an array but received:", products);
            }
            // Update the color options dropdown based on the loaded products
            updateColorOptions(products, productId);

            // Find the selected product based on the provided productId
            let selectedProduct = products.find(
                (product) => product.id === Number(productId)
            );

            if (selectedProduct) {
                // Update the product details on the page
                document.getElementById("main-product-image").src = `${selectedProduct.source}`;
                document.getElementById("product-name").textContent = selectedProduct.name;
                document.getElementById("product-description").textContent = selectedProduct.description;
                document.getElementById("product-price").textContent = `Price: ${selectedProduct.price} USD`;
                document.getElementById("delivery-estimation").textContent = selectedProduct.deliveryEstimation;


                // Add an event listener for color changes to update the main product image
                const colorSelect = document.getElementById("color");
                if (colorSelect) {
                    updateImage(selectedProduct);
                    colorSelect.addEventListener("change", () => updateImage(selectedProduct));
                } else {
                    console.error("Color dropdown not found!");
                }
            } else {
                console.error("Product not found!");
            }
        } catch (error) {
            console.error("Error loading details:", error);
        }
    }
    loadData(productID);
    function updateColorOptions(products, productId) {
        const selectedProduct = products.find(
            (product) => product.id === Number(productId)
        );

        if (selectedProduct && Array.isArray(selectedProduct.colorImage)) {
            const colorSelect = document.getElementById("color");
            if (colorSelect) {
                colorSelect.innerHTML = "";

                selectedProduct.colorImage.forEach((colorObj) => {
                    const option = document.createElement("option");
                    option.value = colorObj.color.toLowerCase();
                    option.textContent = colorObj.color;
                    colorSelect.appendChild(option);
                });
            } else {
                console.error("Color dropdown not found!");
            }
        } else {
            console.error("Selected product or color array not found!");
        }
    }

    function updateImage(selectedProduct) {
        if (!selectedProduct || !Array.isArray(selectedProduct.colorImage)) {
            console.error("Selected product or colorImage array is not defined!");
            return;
        }

        let selectedColor = document.getElementById("color").value;

        if(selectedColor){
            let colorImage = selectedProduct.colorImage.find(
                (colorObj) => colorObj.color.toLowerCase() === selectedColor );
                console.log(colorImage);
            if (colorImage) {
                document.getElementById("main-product-image").src = colorImage.image;
                console.log("New image source:", colorImage.image);
                localStorage.setItem("imageId", colorImage.id);
                console.log(`Saved image ID to localStorage: ${colorImage.id}`);
            } else {
                console.error("Image for the selected color not found!");
            }
        }else{
            console.log("Error !!");
        }
      
    }

    function addToCart() {
        let cartInfo = JSON.parse(localStorage.getItem("cartItems")) || [];
        let itemId = localStorage.getItem("imageId");
        if (!cartInfo.includes(itemId)) {
            cartInfo.push(itemId);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartInfo));
        console.log(`Product ${productID} added to cart.`);
    }

    const addToCartButton = document.getElementById("add-to-cart");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", addToCart);
    } else {
        console.error("Add to Cart button not found!");
    }

    loadData(productID);
});
