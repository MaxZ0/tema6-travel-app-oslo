
const mapbox_key = "pk.eyJ1IjoibWF4em9uZSIsImEiOiJjbDFjMmJpYWQwM2loM2NtcnNqeWQ1Z2Q0In0.f42AFt0VTIyqdf6aV7vhqA";

async function buildMap() {

    const allStations = await getStations();
    const stationsStatus = await getStationsStatus();

    const stationStatus = id => {
        return stationsStatus.find((station) => {
            return station.station_id === id;
        })
    }

    const featuredStations = allStations.map(station => {
        const status = stationStatus(station.station_id)
        return {
            type: 'Feature',
            properties: {
                station: station.name,
                address: station.address,
                bikes: status.num_bikes_availabale,
                docks: status.num_docks_availabale,
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [station.lon, station.lat]
            }
        }
    })

    const geojson = {
        'type': 'FeatureCollection',
        'features': featuredStations
    };

    mapboxgl.accessToken = mapbox_key;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/maxzone/cl1gf2i85009v14s9ccb1cv7q', // style URL
        center: [10.75, 59.91], // starting position [lng, lat]
        zoom: 13, // starting zoom
    });


    // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        el.classList.add('marker');

        el.addEventListener('click', () => {
            window.alert(marker.properties.station);
            window.alert(marker.properties.address);
            const adress = (marker.properties.station)
            console.log(adress);

        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }

}
async function getStations() {
    const url = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
    const response = await fetch(url);
    const stations = await response.json();
    return stations.data.stations;
}

async function getStationsStatus() {
    const url = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';
    const response = await fetch(url);
    const stations = await response.json();
    return stations.data.stations;
}

buildMap();