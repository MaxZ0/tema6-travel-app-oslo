/*window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw.js')
    .then(_ => console.log('Registered service worker'))
    .catch(e => console.log('Error registering: ', e));
});

if (navigator && navigator.serviceWorker){
    navigator.serviceWorker.register('../sw.js');
};

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
  registerServiceWorker();*/

  const toSave = 'Oslo';
  localStorage.setItem('lastvisitcity', toSave);

  const lastCity = localStorage.getItem('lastvisitcity');
  console.log(lastCity);

  //lagrer på siden, det siste du var i, bedre bruker opplevelse.