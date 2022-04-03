
const mapbox_key = "pk.eyJ1IjoibWF4em9uZSIsImEiOiJjbDFjMmJpYWQwM2loM2NtcnNqeWQ1Z2Q0In0.f42AFt0VTIyqdf6aV7vhqA";

mapboxgl.accessToken = mapbox_key;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/maxzone/cl1gf2i85009v14s9ccb1cv7q', // style URL
    center: [10.75, 59.91], // starting position [lng, lat]
    zoom: 13, // starting zoom
});