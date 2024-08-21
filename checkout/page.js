document.getElementById('place-order-btn').addEventListener('click', function () {
    const orderData = {
        shippingInfo: {
            fullName: document.getElementById('full-name').value,
            country: document.getElementById('country').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        },
        additionalInfo: document.getElementById('more'),

        paymentMethod: document.querySelector('input[name="payment"]:checked').id,
    };

    // Convert the order data to a JSON string
    const orderDataJson = JSON.stringify(orderData);

    // Save the JSON string to a file or send it to a server (this is a placeholder)
    console.log(orderDataJson);

    // Simulating a save by creating a downloadable JSON file (for demo purposes)
    const blob = new Blob([orderDataJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orderData.json';
    link.click();


    alert('Order placed successfully!');
});
