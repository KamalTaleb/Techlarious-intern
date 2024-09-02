async function loadProducts() {
    try {
        const response = await fetch("products.json");
        const data = await response.json();
        const fromJson = data.products;
        window.addEventListener('storage', function (event) {
            if (event.key === 'cartItems') {
                // const data = JSON.parse(localStorage.getItem('productsJson'));
                renderProducts(fromJson);
            }
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


loadProducts();

function renderProducts(fromJson) {
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error('Element with ID "product-list" not found.');
        return;
    }

    const tbody = productList;
    tbody.innerHTML = '';

    // Get the cart items (IDs) from local storage
    let cartArray = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Match cart items with full product details from fromJson
    cartArray.forEach(cartItemId => {
        const selectedProduct = fromJson.find(product => product.id === Number(cartItemId));

        // Check if the selectedProduct is found
        if (!selectedProduct) {
            console.error('Product not found for ID:', cartItemId);
            return;
        }

        // Calculate the discounted price
        const discountedPrice = parseFloat(selectedProduct.price) * (1 - (selectedProduct.discount || 0) / 100);
        const row = document.createElement('tr');

        // Create row HTML with correct attributes
        row.setAttribute('data-max-quantity', selectedProduct.qty || 1);
        row.innerHTML = `
          <td><img src="${selectedProduct.source}" alt="${selectedProduct.name}" style="width: 50px; height: 50px;"> ${selectedProduct.name}</td>
          <td>$${parseFloat(selectedProduct.price).toFixed(2)}</td>
          <td>$${discountedPrice.toFixed(2)}</td>
          <td>
              <button class="quantity-button" onclick="updateQuantity(this, -1)">-</button>
              <input type="text" value="1" class="quantity-number">
              <button class="quantity-button" onclick="updateQuantity(this, 1)">+</button>
          </td>
          <td class="product-subtotal">$${discountedPrice.toFixed(2)}</td>
          <td><button class="remove-button" data-id="${selectedProduct.id}">Remove</button></td>
        `;
        tbody.appendChild(row);
    });

    // Add click event listeners to the remove buttons
    document.querySelectorAll(".remove-button").forEach(button => {
        button.addEventListener('click', (event) => removeItem(button, event));
    });

    updateCartSummary();
}

function updateQuantity(button, change) {
    const row = button.closest('tr');
    const priceCell = row.querySelector('td:nth-child(2)');
    const quantityCell = row.querySelector('td:nth-child(4) input');
    const subtotalCell = row.querySelector('td:nth-child(5)');

    const price = parseFloat(priceCell.textContent.replace('$', ''));
    let quantity = parseInt(quantityCell.value);

    // Get the maximum quantity available for the product
    const maxQuantity = parseInt(row.dataset.maxQuantity);

    // Calculate new quantity
    quantity += change;

    // Ensure the quantity doesn't fall below 1 or exceed the available stock
    if (quantity < 1) {
        quantity = 1;
    } else if (quantity > maxQuantity) {
        alert(`Sorry, only ${maxQuantity} units are available.`);
        quantity = maxQuantity;
    }

    quantityCell.value = quantity;

    const discountedPrice = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', ''));
    const subtotal = discountedPrice * quantity;

    subtotalCell.textContent = `$${subtotal}`;

    updateCartSummary();
}

function updateCartSummary() {
    const subtotals = document.querySelectorAll('.product-subtotal');
    let subtotal = 0;

    subtotals.forEach(subtotalElement => {
        subtotal += parseFloat(subtotalElement.textContent.replace('$', ''));
    });

    const cartSubtotal = document.getElementById('cart-subtotal');

    if (cartSubtotal) {
        cartSubtotal.innerHTML = `Subtotal<br><br>$${subtotal.toFixed(2)}`;
    } else {
        console.error('Element with ID "cart-subtotal" not found.');
    }

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
        const discount = subtotal * 0.11;
        const total = subtotal - discount + 3.00;
        cartTotal.innerHTML = `
          <span>Total:</span> $${total}<br>
          <span>Discount:</span> -$${discount.toFixed(2)}
      `;
    } else {
        console.error('Element with ID "cart-total" not found.');
    }
}

function clearCart() {
    const productList = document.getElementById('product-list');
    if (!productList || productList.children.length === 0) {
        console.log('Cart is already empty.');
        return;
    }

    if (confirm('Are you sure you want to clear the cart?')) {
        localStorage.removeItem('cartItems');
        productList.innerHTML = '';
        updateCartSummary();
        alert('Cart cleared!');
    }
}

function removeItem(button, event) {
    const row = button.closest('tr');

    if (row) {
        row.remove();
        updateCartSummary();
    } else {
        console.error('Element with the closest row not found.');
    }
    const productId = button.getAttribute("data-id");
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


    const itemIndex = cartItems.findIndex(item => item === productId);
    console.log(itemIndex);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
        console.error('Product ID not found in the cart items.');
    }
}


