const API_KEY = '167deb07b31ff04d3114f082874f2172';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const locationInput = document.getElementById('locationInput');
const weatherBtn = document.getElementById('weatherBtn');
const weatherContainer = document.getElementById('weatherContainer');

weatherBtn.onclick = () => {
    const cityName = locationInput.value.trim();

    if (cityName) {
        const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
        fetch(url)
//        fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (response.status) {
                    return response.json();
                } else throw new Error('Проверьте правильность написания населённого пункта. Если всё верно, попробуйте найти погоду в ближайшем более крупном населённом пункте')
            })
            .then(({
                name,
                sys:{sunrise, sunset},
                main:{temp},
                wind:{speed},
                weather: [{icon, description}], /* Деструктуризация массива [],
                 но если у него внутри лежит объект, то сразу без имени пишем набор полей в фигурных скобках
                  Это означает - что берем нужные поля из объекта, в первом элементе массива.
                  Если нужно взять весь объект - то просто указываем его имя - weather: [firstCondition] */
                }) => {
                // 1. отобразить информацию о погоде (имя города, погода, описание погоды и скорость ветра)
                const sunriseDate = new Date(sunrise*1000);
                const srH = ('0'+sunriseDate.getHours()).slice(-2);
                const srM = ('0'+sunriseDate.getMinutes()).slice(-2);
                const sunsetDate = new Date(sunset*1000);
                const ssH = ('0'+sunsetDate.getHours()).slice(-2);
                const ssM = ('0'+sunsetDate.getMinutes()).slice(-2);
                //  https://openweathermap.org/img/wn/10d@2x.png
                weatherContainer.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center">
                        <h2>${name}</h2>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather"/>
                    </div>
                    <p>${description}</p>
                    <p>Temperature: ${temp.toFixed(1)} °C</p>
                    <p>Speed of wind: ${speed} m/s</p>
                    <p>Sunrise: ${srH}:${srM}</p>
                    <p>Sunset: ${ssH}:${ssM}</p>
                `;
                weatherContainer.style.display = 'block';
            })
            .catch((error) => {
                weatherContainer.textContent = error;
            })
    }
}