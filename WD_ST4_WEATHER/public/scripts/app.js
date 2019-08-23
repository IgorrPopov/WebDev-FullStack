const selectDataSourceLinkClass = 'data-source-link';
const selectActiveClass = 'active';
const selectForecastClass = 'forecast';
const selectNowClass = 'now';

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


$(() => {

    getWeatherForecast('database');



    const $dataSourceLink = $(`.${selectDataSourceLinkClass}`);

    $dataSourceLink.on('click', (e) => {

        e.preventDefault();

        const $target = $(e.target);


        getWeatherForecast($target.text().toLowerCase());


        $dataSourceLink.removeClass(selectActiveClass);
        $target.addClass(selectActiveClass);

    });

});


function getWeatherForecast(sourceDataType) {

    $.getJSON('router.php', { data_source_type: sourceDataType })
        .done((response) => {

            if (response.length >= 1) {
                addCurrentWeather(response[0]);
            }

            if (response.length >= 2) {
                addForecast(response.slice(1, response.length));
            }

        })
        .fail((jqXHR) => {
            let response;

            if ('responseJSON' in jqXHR) {
                response = jqXHR.responseJSON.error_message;
            }

            handleServerError(`${ jqXHR.statusText } ${ jqXHR.status } ${ response || '' }`);
        });

}


function addCurrentWeather(currentWeather) {
    const $now = $(`.${selectNowClass}`);

    $now.empty();

    const date = new Date(currentWeather.date_and_time);

    const dayOfWeek = daysOfTheWeek[date.getDay()];
    const dateOfMonth = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);

    $now.append(
        `<div class="all-50">
            <div class="date">${ dayOfWeek } ${ dateOfMonth }/${ month }</div>
            <div class="current-temperature">${ currentWeather.temperature } &deg;</div>
        </div>
        <div class="all-50">
            <div class="weather-icon">
                <img src="img/icons/${ currentWeather.weather_icon }.svg" alt="${ currentWeather.weather_icon }.svg" class="large-icon">
            </div>
        </div>`
    );
}


function addForecast(response) {
    const $forecast = $(`.${selectForecastClass}`);

    $forecast.empty();

    let newForecasts = '';

    response.forEach(hourlyForecast => {
        const date = new Date(hourlyForecast.date_and_time);

        newForecasts +=
            `<div class="hourly-forecast clearfix">
                <div class="forecast-date">${ date.getHours().toString().padStart(2, 0) }:${ date.getMinutes().toString().padStart(2, 0) }</div>
                <div class="forecast-weather">
                    <div class="forecast-temperature">${ hourlyForecast.temperature } &deg;</div>
                    <div class="forecast-icon">
                        <img src="img/icons/${ hourlyForecast.weather_icon }.svg" alt="${ hourlyForecast.weather_icon }.svg" class="small-icon">
                    </div>
                </div>
            </div>`
    });

    $forecast.append(newForecasts);
}


function handleServerError(errorMsg) {
    swal({
        title: 'Sorry, our server is temporarily unavailable! Please try again later',
        text: errorMsg,
        icon: 'error',
        button: 'OK'
    });
}