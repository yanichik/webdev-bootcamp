mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 // starting zoom
});

// Set options
const marker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: true
  })
  .setLngLat(campground.geometry.coordinates)
  .addTo(map);