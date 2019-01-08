const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

const MAX_ARRAY_INDEX = IMAGES.length - 1;
const MIN_ARRAY_INDEX = 0;

const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

const selectSliderCurrentClass = 'slider-current';
const selectSliderIndicatorsClass = 'slider-indicators';
const selectSliderPreviewsClass = 'slider-previews';
const selectCurrentClass = 'current';

let imagesArrayIndex = 0;

$(function() {
    const $sliderPreviews  = $(`.${selectSliderPreviewsClass}`); // wrapper of small images
    const $sliderCurrentImage = $(`.${selectSliderCurrentClass} img`); // main image

    $sliderPreviews.html(IMAGES.reduce(createSliderPreviewsList, ''));

    const $sliderPreviewsList = $sliderPreviews.find('li'); // list of small images

    $sliderPreviewsList.first().addClass(selectCurrentClass);

    $('body').keydown((event) => {
        if(event.keyCode === LEFT_ARROW_KEY_CODE) {
            $sliderCurrentImage.attr('src',
                API_URL + BIG_SIZE + '/' + IMAGES[getIndexIfLeftShift()]);

            changeCurrentClassCarrier($sliderPreviewsList);
        }

        if(event.keyCode === RIGHT_ARROW_KEY_CODE) {
            $sliderCurrentImage.attr('src',
                API_URL + BIG_SIZE + '/' + IMAGES[getIndexIfRightShift()]);

            changeCurrentClassCarrier($sliderPreviewsList);
        }
    });

    $sliderPreviewsList.on('click', (event) => {
        const $clickedSlide = $(event.target);

        if($clickedSlide.attr('alt')) { // prevent feet)
            imagesArrayIndex = $clickedSlide.attr('alt');

            $sliderCurrentImage.attr('src',
                API_URL + BIG_SIZE + '/' + IMAGES[imagesArrayIndex]);

            changeCurrentClassCarrier($sliderPreviewsList);
        }
    });
});

const changeCurrentClassCarrier = ($carriersList) => {
    $carriersList.removeClass(selectCurrentClass);
    $carriersList.eq(imagesArrayIndex).addClass(selectCurrentClass);
};

const createSliderPreviewsList = (previews, image) =>
    previews +
    `<li class="${selectSliderIndicatorsClass}">
       <img src="${API_URL + SMALL_SIZE + '/' + image}" alt="${IMAGES.indexOf(image)}">
     </li>`;

const getIndexIfLeftShift = () =>
    (imagesArrayIndex === MIN_ARRAY_INDEX) ?
        imagesArrayIndex = MAX_ARRAY_INDEX : --imagesArrayIndex;

const getIndexIfRightShift = () =>
    (imagesArrayIndex === MAX_ARRAY_INDEX) ?
        imagesArrayIndex = MIN_ARRAY_INDEX : ++imagesArrayIndex;