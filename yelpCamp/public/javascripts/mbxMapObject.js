mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-preview-day-v4', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12 // starting zoom
});

// Set options
const marker = new mapboxgl.Marker({
    // color: "#FFFFFF",
    draggable: true
  })
  .setLngLat(campground.geometry.coordinates)
  .setPopup(new mapboxgl
  	.Popup({offset: 35})
  	.setHTML(`<h5>${campground.title}</h5><p>${campground.location}</p>`)
  	)
  .addTo(map);