function setAutoComplete() {
    var map, marker;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 39.783809,
                lng: -102.057222
            },
            zoom: 3,
            mapTypeId: "satellite"
        });

        marker = new google.maps.Marker({
            position: {
                lat: 39.783809,
                lng: -102.057222
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
            console.log('here');
            document.getElementById('hide-map').classList.remove('hide');
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