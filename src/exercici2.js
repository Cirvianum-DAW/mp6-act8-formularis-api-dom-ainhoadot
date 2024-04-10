document.getElementById('location').addEventListener('submit', async function (event) {
    event.preventDefault();

    //Obtenim tots els valos entrats al formulari
    const street = document.querySelector('#street').value;
    const city = document.querySelector('#city').value;
    const postalCode = document.querySelector('#postalCode').value;
    const country = document.querySelector('#country').value;

    //Exercicis:

    //Heu de realitzar les següents validacions dels camps del formulari:

    // El camp del ciutat i codi postal són obligatoris.Heu de mostrar un missatge d'alerta si aquest camp està buit.
    if (!city) {
        alert('El camp ciutat és obligatori.');
        return;
    }

    if (!postalCode) {
        alert('El camp codi postal és obligatori.');
        return;
    }

    //Heu de realitzar una petició a l'API de www.weatherapi.com utilitzant les dades proporcionades pel formulari per obtenir la informació meteorològica. L'API proporciona dades meteorològiques actuals i una previsió per al dia següent.

    //Heu de mostrar la informació obtinguda de l'API a la pàgina web. La informació a mostrar ha de incloure:
    // Temperatura actual.
    // Descripció del temps actual.
    // Icona que representa les condicions meteorològiques actuals.
    // Temperatura prevista per al dia següent.
    // Descripció del temps previst per al dia següent.
    // Icona que representa les condicions meteorològiques previstes per al dia següent.

    try {
        const apiKey = 'c4f05d868fbd40ec95f150248241004';
        const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;
        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&lang=es&days=2`;

        //Amb destructuring puc recuperar el resultat de les dues peticions un cop Promise.All les hagi resolt
        const [currentResponse, forecastResponse] = await Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)]);

        //Amb la mateixa idea que abans, torno a resoldre els parseig del JSON per convertir-lo a un objecte JS
        const [currentData, forecastData] = await Promise.all([currentResponse.json(), forecastResponse.json()]);

        //Abans de realitzar els canvis a través del DOM, ens guardem la informació necessària que hem recuperat de l'API
        const weatherData = {
            current: {
                city: currentData.location.name,
                country: currentData.location.country,
                region: currentData.location.region,
                weatherIcon: currentData.current.condition.icon,
                temperature: `${currentData.current.temp_c}ºC`,
                weatherDescription: currentData.condition.text,
            },
            forecast: {
                city: forecastData.location.name,
                country: forecastData.location.country,
                region: forecastData.location.region,
                weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
                temperature: `${forecastData.forecast.forecastday[1].day.avgtemp_c}ºC`,
                weatherDescription: forecastData.forecast.forecastday[1].day.text,
            }
        }

        //Separem la lògica per modificar l'HTML:
        displayWeatherResults(weatherData);

    } catch (error) {
        console.error("Error en la pertició a l'API", error);
    }

    //Heu de gestionar els errors de la petició a l'API. Si hi ha algun error en la petició, heu de mostrar un missatge d'error a l'usuari.    

})