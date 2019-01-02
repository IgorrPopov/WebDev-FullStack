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

const selectHeaderClass = 'selector__header';
const selectTitleClass = 'selector__header--title';
const selectOptionsClass = 'selector__options';
const selectOptionsElementClass = 'selector__options--element';
const selectSelectedElementClass = 'selector__options--selected-element';

$(document).ready(() => {
    const $header = $(`.${selectHeaderClass}`);
    const $title = $(`.${selectTitleClass}`);
    const $options = $(`.${selectOptionsClass}`);

    $options.html(FRIENDS
        .map((friend) => createOptionalElement(friend))
        .join(''));

    $('body').on('click', () => {
        $options.slideUp();
    });

    $header.on('click', (event) => {
        event.stopPropagation();

        if(!$(':animated').length) {
            $options.slideToggle();
        }
    });

    $options.on('click', (event) => {
        const $clickedOption = getClickedOption(event.target);

        if(!$clickedOption.hasClass(selectOptionsClass)) {
            $(`.${selectOptionsElementClass}`)
                .removeClass(selectSelectedElementClass);
            $clickedOption.addClass(selectSelectedElementClass);

            $options.slideUp();
            $title.html($clickedOption.html());
        }

        event.stopPropagation();
    });
});
// prevents adding empty html to title if user clicked on img tag
const getClickedOption = (target) =>
    target.innerHTML ? $(target) : $(target.parentElement);

const getImageSource = (friendName) =>
    `pictures/${friendName.toLowerCase().replace(' ', '_')}.jpg`;

const createOptionalElement = (friend) =>
    `<div class="${selectOptionsElementClass}">
      <img src="${getImageSource(friend)}">
      ${friend}
    </div>`;