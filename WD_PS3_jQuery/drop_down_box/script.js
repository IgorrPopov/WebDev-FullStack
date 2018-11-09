const FRIENDS = [
    'Isaac Newton',
    'Louis Pasteur',
    'Galileo Galilei',
    'Marie Curie',
    'Albert Einstein',
    'Charles Darwin',
    'Otto Hahn',
    'Nikola Tesla',
    'James Maxwell',
    'Aristotle'
];

$(document).ready(() => {
    let $container = $('.container');
    /* create all dropDownBox options (FRIENDS) */
    $container.html(FRIENDS.map((f) => makeBox('box clicker', f)).reduce((a, b) => a + b));

    $('html').on('click', () => {
        if (!$(':animated').length) {
            const classes = event.toElement.classList;
            const $aim = (classes.contains('image')) ? // if our final target is image
                event.target.parentNode : event.target; // then we take it`s wrapper
            dropDownBox(classes, $aim, $container);
        }
    });
});

function dropDownBox(classes, $aim, $container) {
    if(classes.contains('clicker')){
        $container.slideToggle(() => {
            if(classes.contains('box') || classes.contains('image')){
                sliderMovement($aim, $('.title'));
            }
        });
    } else if($container.css('display') !== 'none'){
        $container.slideUp();
    }
}

function sliderMovement($aim, $titleBox) {
    if (!$titleBox[0].classList.contains('delete')) {
        pullDownTitleBox($titleBox);
    }
    replaceTitleBox($aim, $titleBox);
}

function replaceTitleBox($aim, $titleBox) {
    $titleBox.replaceWith(makeBox('title clicker', $aim.textContent, ''));
    $aim.replaceWith('');
}

function pullDownTitleBox($titleBox) {
    const index = FRIENDS.indexOf($titleBox[0].innerText);
    const $child =  $(`.container div:nth-child(${index || 1})`);
    (index) ? $child.after(makeBox('box clicker', FRIENDS[index])) :
        $child.before(makeBox('box clicker', FRIENDS[index]));
}

function makeBox(classes, friend, imgClass = 'image') {
    const image = (text) => `pictures/${text.toLowerCase().replace(' ', '_')}.jpg`;
    return `<div class="${classes}"><img src="${image(friend)}"
              class="clicker ${imgClass}">${friend}</div>`;
}
