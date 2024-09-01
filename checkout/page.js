document.getElementById('place-order-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form fields
    const orderData = {
        shippingInfo: {
            fullName: document.getElementById('full-name').value.trim(),
            country: document.getElementById('country').value,
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        },
        additionalInfo: document.getElementById('more').value.trim(),
        paymentMethod: document.querySelector('input[name="payment"]:checked') ? document.querySelector('input[name="payment"]:checked').id : ''
    };

    // Validate that all required fields are filled correctly
    const isShippingInfoValid = Object.values(orderData.shippingInfo).every(field => field !== '');
    const isPaymentMethodValid = orderData.paymentMethod !== '';

    if (!isShippingInfoValid || !isPaymentMethodValid) {
        showPopup('order-error-popup'); // Show error popup if validation fails
        return;
    }

    // Convert the order data to a JSON string
    const orderDataJson = JSON.stringify(orderData, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([orderDataJson], { type: 'application/json' });

    // Create a link element and set its href to the Blob URL
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orderData.json';

    // Append the link to the body, click it to trigger the download, and remove it afterward
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showPopup('order-success-popup'); // Show success popup
});

// Function to show a popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';

    // Close the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Close the popup when the close button is clicked
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.parentElement.parentElement.style.display = 'none';
    });
});
