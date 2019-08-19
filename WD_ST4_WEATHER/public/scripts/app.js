// How do you?
const selectDataSourceLinkClass = 'data-source-link';
const selectActiveClass = 'active';


$(() => {

    const $dataSourceLink = $(`.${selectDataSourceLinkClass}`);

    $dataSourceLink.on('click', (e) => {

        e.preventDefault();

        const $target = $(e.target);


        // this[$target.text().toLowerCase()]();

        getWeatherForecast($target.text().toLowerCase());

        $dataSourceLink.removeClass(selectActiveClass);
        $target.addClass(selectActiveClass);

    });

});


function getWeatherForecast(sourceDataType) {

    $.getJSON('router.php', {
        data_source_type: sourceDataType
    }, (res) => {
        console.log(res);
    }).done(() => {
        console.log('done');
    }).fail((jqxhr,settings,ex) => {
        console.log('fail');
    });

}



// function database() {
//     console.log('database');
// }
//
// function api() {
//     console.log('api');
// }
//
// function json() {
//     console.log('json');
// }