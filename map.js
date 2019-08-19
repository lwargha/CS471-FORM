// var lat, long;
// navigator.geolocation.getCurrentPosition(getPosition(position) { 

// });

function getPosition(position) {
    return {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    }
}

function setAutoComplete() {
    var map, marker;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                zoom: 20,
                mapTypeId: "satellite"
            });

            marker = new google.maps.Marker({
                position: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                draggable: true,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                title: 'ADDRESS'
            });
            var input = document.getElementById('street-address');
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            autocomplete.setFields(
                ['address_components', 'geometry']);

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                place = autocomplete.getPlace();
                document.getElementById('map').classList.remove('hide');
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                    map.setZoom(20);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(20);
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
            });
        })

    } else {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 43.802347,
                lng: -111.775419
            },
            zoom: 20,
            mapTypeId: "satellite"
        });

        marker = new google.maps.Marker({
            position: {
                lat: 43.802347,
                lng: -111.775419
            },
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            title: 'ADDRESS'
        });

        var input = document.getElementById('street-address');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(
            ['address_components', 'geometry']);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            place = autocomplete.getPlace();
            console.log(place);
            document.getElementById('map').classList.remove('hide');
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                map.setZoom(20);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(20);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
        });
    }


}