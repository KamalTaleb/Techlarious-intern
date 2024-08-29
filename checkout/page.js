document.getElementById('place-order-btn').addEventListener('click', function () {
    // Get the values from the form
    const orderData = {
        shippingInfo: {
            fullName: document.getElementById('full-name').value,
            country: document.getElementById('country').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        },
        additionalInfo: document.getElementById('more').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked') ? document.querySelector('input[name="payment"]:checked').id : '',
        codAddress: document.getElementById('cod-address').value
    };

    // Ensure all required fields are filled
    if (Object.values(orderData.shippingInfo).some(field => !field) || !orderData.paymentMethod || (orderData.paymentMethod === 'cash' && !orderData.codAddress)) {
        alert('Please fill in all the required fields.');
        return;
    }

    // Convert the order data to a JSON string
    const orderDataJson = JSON.stringify(orderData, null, 2);

    // Save the JSON string to a file
    const blob = new Blob([orderDataJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orderData.json';
    link.click();

    // Show the popup
    const popup = document.getElementById('order-success-popup');
    popup.style.display = 'block';

    // Close the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
});

// Google Maps integration
document.getElementById('choose-location-btn').addEventListener('click', function (e) {
    e.preventDefault();
    const map = document.getElementById('map');
    map.style.display = 'block';

    // Initialize Google Maps
    const mapOptions = {
        center: new google.maps.LatLng(40.712776, -74.005974), // Default to New York
        zoom: 12
    };
    const gmap = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: gmap,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        const position = marker.getPosition();
        document.getElementById('cod-address').value = `${position.lat()}, ${position.lng()}`;
    });
});

// Close the popup when the close button is clicked
document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('order-success-popup').style.display = 'none';
});
