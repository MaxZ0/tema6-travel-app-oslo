const tmKey = 'yKri1T0t7dgURZUwytFGwKsCANXtqUnF';

async function getEvents() {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=[Oslo]&apikey=${tmKey}`;
    const response = fetch(url);
    const results = await (await response).json();

    const events = results._embedded.events;

    events.forEach(event => {
        const container = document.getElementById('app');
        //console.log(event.name);
        const pEl = document.createElement('p');
        pEl.textContent = event.name;
        container.append(pEl)
    });

}

getEvents();