const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '../sw.js',
        {
          scope: '/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
registerServiceWorker();

const mapbox_key =
  "pk.eyJ1IjoibWF4em9uZSIsImEiOiJjbDFjMmJpYWQwM2loM2NtcnNqeWQ1Z2Q0In0.f42AFt0VTIyqdf6aV7vhqA";

async function buildMap() {
  const allStations = await getStations();
  const stationsStatus = await getStationsStatus();

  const stationStatus = (id) => {
    return stationsStatus.find((station) => {
      return station.station_id === id;
    });
  };

  const featuredStations = allStations.map((station) => {
    const status = stationStatus(station.station_id);
    return {
      type: "Feature",
      properties: {
        station: station.name,
        address: station.address,
        bikes: status.num_bikes_available,
        docks: status.num_docks_available,
      },
      geometry: {
        type: "Point",
        coordinates: [station.lon, station.lat],
      },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features: featuredStations,
  };

  mapboxgl.accessToken = mapbox_key;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/maxzone/cl1gf2i85009v14s9ccb1cv7q", // style URL
    center: [10.75, 59.91], // starting position [lng, lat]
    zoom: 13, // starting zoom
  });

  // Add markers to the map.
  for (const marker of geojson.features) {
    // Create a DOM element for each marker.
    const el = document.createElement("div");
    el.classList.add("marker");
    let html = "";

    el.addEventListener("click", function () {
      const station = marker.properties.station;
      const address = marker.properties.address;
      const bikes = marker.properties.bikes;
      const docks = marker.properties.docks;
      document.getElementById("container").innerHTML =
        html += `<div class="card-container">
      <div class="inner-container">
          <h2 class="open-sans margin-z dark-blue">${station}</h2>
          <p class="open-sans margin-z dark-blue">${address}</p>
          <span></span>
          <div class="flex">
              <img class="card-icons margin-z" src="./assets/img/bike.png">
              <p class="open-sans margin-z dark-blue padding-top-text">${bikes} bikes</p>
          </div>
          <div class="flex">
              <img class="card-icons margin-z" src="./assets/img/stativ.svg">
              <p class="open-sans margin-z dark-blue padding-top-text">${docks} available</p>
          </div>
      </div>
  </div>`;
    });

    // Add markers to the map.
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  }
}

async function getStations() {
  const url =
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
  const response = await fetch(url);
  const stations = await response.json();
  return stations.data.stations;
}

async function getStationsStatus() {
  const url =
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";
  const response = await fetch(url);
  const stations = await response.json();
  return stations.data.stations;
}

buildMap();
