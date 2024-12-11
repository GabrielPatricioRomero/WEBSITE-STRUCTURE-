let map;

function initMap() {
    // Default map center (e.g., New York)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };
    
    // Create the map centered on the default location
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
    });

    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);

            // Add a marker for the user's location
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "Your Location"
            });

            // Fetch nearby events
            fetchNearbyEvents(userLocation);
        }, () => {
            alert("Error: The Geolocation service failed.");
        });
    } else {
        alert("Error: Your browser does not support geolocation.");
    }
}

// Function to fetch nearby events based on user location
function fetchNearbyEvents(userLocation) {
    // Example nearby event data (could be fetched from an API)
    const events = [
        {
            name: "Tech Workshop for Beginners",
            lat: 40.730610,
            lng: -73.935242,
            description: "A workshop for beginners to get started with tech tools."
        },
        {
            name: "Art Exhibition: Local Creatives",
            lat: 40.741895,
            lng: -73.989308,
            description: "An exhibition showcasing artwork from local artists."
        }
    ];

    // Create markers for each event
    events.forEach(event => {
        const eventLocation = { lat: event.lat, lng: event.lng };

        new google.maps.Marker({
            position: eventLocation,
            map: map,
            title: event.name
        });

        // Add event to the nearby event list
        const eventList = document.getElementById("event-list");
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${event.name}</strong><br>${event.description}`;
        eventList.appendChild(listItem);
    });
}
