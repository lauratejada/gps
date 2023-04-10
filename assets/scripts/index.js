'use strict';


function selector(element, parent = document) {
    return parent.querySelector(element);
}

const loading = selector('.loader');
const displayMap = selector('.map');
const body = selector('body');

displayMap.style.display = 'none';

function getLocation(position){    
    const {latitude, longitude} = position.coords;

    console.log(
        `Latitud: ${latitude}\n` + 
        `Longitud: ${longitude}\n` 
    );
/*
if(longitude && latitude) {
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
    setTimeout({() => overlay.style.display = 'none' }, 500);
}

*/

    mapConfig(longitude, latitude);
}

function errorHandler(event){
    mapConfig(-97.19267,49.81486); // show this location by default
    console.log("Unable to retrieve your location");

    loading.style.animationPlayState ='paused';
    console.log(event.message);

}

const options = {
    enableHighAccuracy: true, 
    maximumAge: 0    // time of live
}

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmF0ZWphZGEiLCJhIjoiY2xnMTQ4am5sMHN4NjNwcTFnemVtNmJyciJ9.ulDWtEH2eHe48Es8RfYOMA';

function mapConfig(longitude, latitude){
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude,latitude],
        zoom: 16
    });
     
    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
    
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({color: '#35b8be'})
    .setLngLat([longitude,latitude])
    .addTo(map);

    map.dragPan.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
        // disable map rotation using right click + drag
    map.dragRotate.disable();
    
    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();
}

/*
window.addEventListener('click', () => {
    loading.style.display = 'none';
    displayMap.style.display = 'block';
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation not supported by your browser');
    }
});
*/

const timer = setInterval(function() {
    loading.style.display = 'none';
    displayMap.style.display = 'block';
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(getLocation, errorHandler, options);
    } else {
        console.log('Geolocation not supported by your browser');
    }
    clearInterval(timer);
}, 2000);

