const SPEED = 1000;
const PAGE_TOP = 0;

const selectFooterUpButtonClass = 'footer__up-button';


const selectNavigationClass = 'navigation';
const selectNavigationInvisibleClass = 'navigation--invisible';

const selectMenuIconButtonClass = 'menu-icon__button';
const selectMenuIconLineFirstClass = 'menu-icon__line--first';
const selectMenuIconLineSecondClass = 'menu-icon__line--second';
const selectMenuIconLineThirdClass = 'menu-icon__line--third';
const selectMenuIconLineForthClass = 'menu-icon__line--fourth';

const selectMenuIconLineFirstTransformClass = 'menu-icon__line--first-transform';
const selectMenuIconLineFourthTransformClass = 'menu-icon__line--fourth-transform';
const selectMenuIconLineZeroOpacityClass = 'menu-icon__line--zero-opacity';


$(() => {

    // scroll up
    const $webPage = $('html, body');
    const stopScroll = () => {
        $webPage.on("DOMMouseScroll mousewheel keyup touchmove scroll wheel",
            () => { $webPage.stop();}
        );
    };

    $(`.${selectFooterUpButtonClass}`).on('click', () => {
        if (!$(':animated').length) {
            stopScroll();
            $webPage.animate({scrollTop : PAGE_TOP}, SPEED);
        }
    });

    // display navigation block
    $(`.${selectMenuIconButtonClass}`).on('click', () => {
        $(`.${selectNavigationClass}`)
            .toggleClass(selectNavigationInvisibleClass);

        $(`.${selectMenuIconLineSecondClass}, .${selectMenuIconLineThirdClass}`)
            .toggleClass(selectMenuIconLineZeroOpacityClass);

        $(`.${selectMenuIconLineFirstClass}`)
            .toggleClass(selectMenuIconLineFirstTransformClass);

        $(`.${selectMenuIconLineForthClass}`)
            .toggleClass(selectMenuIconLineFourthTransformClass);
    });

});