// Text messages
const WRONG_DATE_MESSAGE = 'You entered dates with errors! Please check the input and try again.';
const OUTPUT_FORMAT_MESSAGE =  'Output format: ';
const INVALID_INPUT_MESSAGE = 'Invalid input, please try again!';
const ADDITION_RESULT_MESSAGE = 'Result of addition: ';
const STUDENT_AGE_MESSAGE = 'Возраст студента: ';
const DIGITS_SUM_MESSAGE = 'The sum of digits: ';
const WRONG_APARTMENT_NUMBER_MESSAGE = 'Wrong apartment number! The building has no apartment with this number.';
const ENTRANCE_AND_FLOOR_NUM_MASSAGE = 'Entrance and floor numbers ';
const TIME_DIFFERENCE_MESSAGE = 'Между датами прошло';
// Regular expressions
const MATCH_INPUT_DATE = /^[jfmasondJFMASOND][a-zA-Z]{2,8}\s[0-9]{1,2},\s[0-9]*\s[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/g;
const DIGIT = /\d/g;
const NOT_DIGIT = /\D/g;
const TWO_AND_MORE_COMMAS = /,{2,}/;
const WHITE_SPACE = /\s/g;
const MATCH_INPUT_DIMENSION = /^\d+[xX]\d+$/g;
const MATCH_DOB = /^\d{4}-\d{1,2}-\d{1,2}$/g;
const HTTP_S = /http[s]?:[/]+/g;
const DATE_ELEMENTS_SEPARATOR = /[\s,:]+/;
// Arrays with time units names
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december'];
const DATE_ELEMENTS_NAMES = [['год', 'года', 'лет'], ['месяц', 'месяца', 'месяцев'],
    ['день', 'дня', 'дней'], ['час', 'часа', 'часов'], ['минута', 'минуты', 'минут'],
    ['секунда', 'секунды', 'секунд']];
// Zodiac sings ranges and names of each sign
const ZODIAC_SIGNS_RANGE = [[3, 21, 4, 20, 'Aries'],[4, 21, 5, 21, 'Taurus'], [5, 22, 6, 21, 'Gemini'],
    [6, 22, 7, 23, 'Cancer'], [7, 24, 8, 23, 'Leo'], [8, 24, 9, 23, 'Virgo'], [9, 24, 10, 23, 'Libra'],
    [10, 24, 11, 22, 'Scorpio'], [11, 23, 12, 21, 'Sagittarius'], [12, 22, 1, 20, 'Capricorn'],
    [1, 21, 2, 19, 'Aquarius'], [2, 20, 3, 20, 'Pisces']];
// Numeric constants
const STARS_IN_TRIANGLE = 50;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MONTHS_IN_YEAR = 12;
const FEBRUARY = 2;
const LEAP_YEAR = 4;
const AMOUNT_OF_VALID_ARGUMENTS = 4;
const HOURS_RANGE = 23;
const MINUTES_AND_SECONDS_RANGE = 59;
const RANDOM_YEAR = 2050;
const CHESS_BOARD_CELL_SIZE_IN_PX = 30;
const ADDITION_MIN = -10000;
const ADDITION_MAX = 10000;
const ADDITION_IF = [2, 3, 7];
const DAYS_OF_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DATE_ARRAY_INDEXES = [2, 0, 1, 3, 4, 5]; // from years to seconds
// Colors of chess boards cells
const FIRST_CELL_COLOR = '#000000';
const SECOND_CELL_COLOR = '#ffffff';
// Pictures extension and path to folder with images
const IMAGES_PATH = 'pictures/';
const IMAGES_FILE_FORMAT = '.jpg';
// Adding zero if time element less than 10
const TIME_PART = input => input <= 9 ? `0${input}` : input; // add zero if we have one digit

// Tasks 1 & 2 _ _ _ _ _ _ _ _ _ _ _

/**
 * First task -  sum from -10000 to 10000.
 * Second task - find sum of the numbers from -1000 to 1000,
 * summing only the numbers  that end at 2, 3, and 7
 * @param id of the tag that will show the result
 * @param additionCondition - addition with condition or not
 */
function addition(id, additionCondition) {
    let sum = 0;
    if(!additionCondition) { // simple addition
        for (let i = ADDITION_MIN; i <= ADDITION_MAX; i++) {
            sum += i;
        }
    } else { // addition with condition
        for (let i = ADDITION_MIN; i <= ADDITION_MAX; i++){
            let lastDigit = Number(i.toString().slice(-1));
            if(ADDITION_IF.some((n) => n === lastDigit)){
                sum += i;
            }
        }
    }
    addInnerHTML(id, `${ADDITION_RESULT_MESSAGE}${sum}`);
}

// Task 3 _ _ _ _ _ _ _ _ _ _ _

/**
 * Display on the page a list of 50 '*' elements of the triangle form
 * @param id of the tag that will show the triangle
 */
function printTriangle(id) {
    let triangle = document.createElement('p');
    for (let i = 0; i < STARS_IN_TRIANGLE ; i++) {
        let lineOfStars = '';
        for (let j = 0; j <= i ; j++) {
            lineOfStars += '*';
        }
        triangle.appendChild(document.createTextNode(lineOfStars));
        triangle.appendChild(document.createElement('br'));
    }
    appendChildById(id, triangle);
}

// Task 4 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the time in seconds. Output in the format: hh: mm: ss  (01:05:20)
 * @param id of the tag that will show the result
 * @param secondsString given from the user
 */
function convertSeconds(id, secondsString) {
    const totalSeconds = Number(secondsString.replace(',', '.'));
    (!isNaN(totalSeconds) && totalSeconds >= 0) ?
        addInnerHTML(id, `${OUTPUT_FORMAT_MESSAGE}${convertTimeFormat(totalSeconds)}`) :
        addInnerHTML(id, INVALID_INPUT_MESSAGE);
}

/**
 * Convert seconds to suitable format
 * @param totalSeconds given from the user
 * @returns {string} looks like this '00:12:01'
 */
function convertTimeFormat(totalSeconds) {
    const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
    totalSeconds -= hours * SECONDS_IN_HOUR;
    const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
    const seconds = Math.floor(totalSeconds - (minutes * SECONDS_IN_MINUTE));
    return TIME_PART(hours) + ':' + TIME_PART(minutes) + ':' + TIME_PART(seconds);
}

// Task 5 _ _ _ _ _ _ _ _ _ _ _

/**
 * For the given age of the student, prints the phrase "22 года" (1 год, 20 лет.... etc.)
 * @param id of the tag that will show the result
 * @param years (age) of the student
 */
function age(id, years) {
    let age = Math.floor(Number(years.replace(',', '.')));
    (!isNaN(age) && age >= 0) ?                                                // 'год', 'года', 'лет'
        addInnerHTML(id, `${STUDENT_AGE_MESSAGE}${age} ${dateElementTail(age, DATE_ELEMENTS_NAMES[0])}`) :
        addInnerHTML(id, INVALID_INPUT_MESSAGE);
}

// Task 6 _ _ _ _ _ _ _ _ _ _ _

/**
 * Find the difference between two dates
 * @param id of the tag that will show the result
 * @param firstDate added by the user or generated randomly
 * @param secondDate added by the user or generated randomly
 */
function timeInterval(id, firstDate, secondDate) {
    if(isMatch(firstDate, MATCH_INPUT_DATE) && isMatch(secondDate, MATCH_INPUT_DATE)){
        const startDate = checkDate(firstDate.split(DATE_ELEMENTS_SEPARATOR));
        const finishDate = checkDate(secondDate.split(DATE_ELEMENTS_SEPARATOR));
        if(startDate !== null && finishDate !== null){
            calculatingDateDifference(id, startDate, finishDate);
            return;
        }
    }
    addInnerHTML(id, WRONG_DATE_MESSAGE);
}

/**
 * Checking all elements of the date array by comparing
 * to the ranges of each element of the date
 * @param dateArray an array with all date elements separately
 * @returns {*} null if date isn`t valid and the array (only numbers) with date if valid
 */
function checkDate(dateArray) {
    if(checkMonth(dateArray[0].toLowerCase())){
        dateArray[0] = MONTHS.indexOf(dateArray[0].toLowerCase()) + 1;
        const numericDateArray = dateArray.map(Number); // an array with numeric date representation
        const elementRanges = dateElementRanges(numericDateArray[0], numericDateArray[2]); // ranges without a year and month
        return (checkRanges(elementRanges, numericDateArray) && numericDateArray[1] > 0) ? numericDateArray : null;
    }                                                 // check the day, it must be bigger then 0
    return null;
}

/**
 * Check if date has invalid elements
 * @param ranges of each element of the date (in this function we need only day)
 * @param dateArray date array
 * @returns {boolean} true if the date is valid and false if it's not
 */
function checkRanges(ranges, dateArray) {
    if(isNaN(dateArray[2]) || dateArray[2] < 0) return false; // year
    if(isNaN(dateArray[1]) || dateArray[1] < 0 || dateArray[1] > ranges[1]) return false; // day
    if(isNaN(dateArray[3]) || dateArray[3] < 0 || dateArray[3] > HOURS_RANGE) return false; // hour
    if(isNaN(dateArray[4]) || dateArray[4] < 0 || dateArray[4] > MINUTES_AND_SECONDS_RANGE) return false; // min
    if(isNaN(dateArray[5]) || dateArray[5] < 0 || dateArray[5] > MINUTES_AND_SECONDS_RANGE) return false; // sec
    return true;
}

/**
 * Create an array with ranges of each element of the date
 * @param month to check if it's february
 * @param year to check if it's leap year
 * @returns {number[]} an array with ranges
 */
function dateElementRanges(month, year) {
    let dateElementRanges = [MONTHS_IN_YEAR, DAYS_OF_MONTHS[month - 1],
        HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_MINUTE];
    if (month === FEBRUARY && year % LEAP_YEAR === 0) { // if february and leap year
        dateElementRanges[1]++;
    }
    return dateElementRanges;
}

/**
 * Loop an array with 12 months to find a match
 * @param inputMonth that we want to check
 * @returns {boolean} true if month is valid
 */
function checkMonth(inputMonth) {
    let trueMonth = MONTHS.filter(month => month === inputMonth);
    return trueMonth.length > 0;
}

/**
 * Calculate the time difference
 * @param id of the html tag
 * @param startDate first date
 * @param finishDate second date
 */
function calculatingDateDifference(id, startDate, finishDate) {
    let difference;
    (!firstDateIsEarlier(startDate, finishDate)) ? difference = subtractDifference(startDate, finishDate) :
        difference = subtractDifference(finishDate, startDate); // an array that we need according to the task
    let resultString = '';
    for (let i = 0; i < difference.length; i++) {
        resultString += ` ${difference[i]} ${dateElementTail(difference[i], DATE_ELEMENTS_NAMES[i])}`;
    }
    addInnerHTML(id, `${TIME_DIFFERENCE_MESSAGE}${resultString}`);
}

/**
 * Compare each element of the date from year to seconds
 * if first date element isn't bigger it means that first date is
 * earlier if second it means second date is earlier. In case if
 * two elements is equal we looping more
 * @param firstDate given form the user
 * @param secondDate given form the user
 * @returns {boolean} earlier or not
 */
function firstDateIsEarlier(firstDate, secondDate) {
    for (let i = 0; i < DATE_ARRAY_INDEXES.length; i++) {
        if(firstDate[DATE_ARRAY_INDEXES[i]] > secondDate[DATE_ARRAY_INDEXES[i]]){
            return true;
        }
        if (firstDate[DATE_ARRAY_INDEXES[i]] < secondDate[DATE_ARRAY_INDEXES[i]]) {
            return false;
        } // if the elements are the same, looping more
    }
    return true;
}

/**
 * Subtract differences between two dates
 * @param startDate given form the user
 * @param finishDate given form the user
 * @returns {Array} with differences
 */
function subtractDifference(startDate, finishDate) {
    let result = [], rearrange = 0;
    for (let i = 0; i < startDate.length; i++) {
        let element = finishDate[i] - startDate[i];
        if(element < 0) {
            rearrange ++;
        }
        result.push(element);
    }
    // switch the months, days and years in the array and put them in order
    [result[0], result[1], result[2]] = [result[2], result[0], result[1]];
    return (rearrange === 0) ? result : rearrangeElements(result, dateElementRanges(startDate[0], startDate[2]));
}

/**
 * Shift remainder from the date elements if ranges was reached
 * @param dateArray an array before rearrange
 * @param dateElementRanges ranges of each date element
 * @returns {*} the rearranged date array
 */
function rearrangeElements(dateArray, dateElementRanges) {
    for (let i = dateArray.length; i > 0; i--) {
        if(dateArray[i] < 0){
            dateArray[i] += dateElementRanges[i - 1];
            dateArray[i - 1]--;
        }
    }
    return dateArray;
}

/**
 * Create and add to text fields random dates for testing
 * @param firstDateId id of the first date text field
 * @param secondDateId id of the second date text field
 */
function randomDate(firstDateId, secondDateId) {
    document.getElementById(firstDateId).value = createDate();
    document.getElementById(secondDateId).value = createDate();
}

/**
 * Create string with random date
 * @returns {string} like: "October 13, 2014 11:13:00"
 */
function createDate() {
    const month = MONTHS[Math.floor((Math.random() * (MONTHS_IN_YEAR )))];
    const year = Math.floor((Math.random() * RANDOM_YEAR) + 1);
    const elementRanges = dateElementRanges(MONTHS.indexOf(month) + 1, year);
    const day = Math.floor((Math.random() * elementRanges[1]) + 1);
    const hours = Math.floor((Math.random() * HOURS_RANGE) + 1);
    const min = Math.floor((Math.random() * MINUTES_AND_SECONDS_RANGE) + 1);
    const sec = Math.floor((Math.random() * MINUTES_AND_SECONDS_RANGE) + 1);
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${
        day}, ${year} ${TIME_PART(hours)}:${TIME_PART(min)}:${TIME_PART(sec)}`;
}

// Task 7 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the date in the format of 2014-12-31,
 * and receives a zodiac sign of that day (with a picture).
 * @param idSign id of the zodiac sign image
 * @param idSingName name of the zodiac sign
 * @param date of birth given form the user
 */
function zodiacSigns(idSign, idSingName, date) {
    let signPicture;
    if(isMatch(date, MATCH_DOB)){
        const dateArray = date.toString().split('-').map(Number);
        if(dateArray[1] > 0 && dateArray[1] <= MONTHS_IN_YEAR && // check month
            checkRanges(dateElementRanges(dateArray[1], dateArray[0]), [dateArray[1], dateArray[2], dateArray[0], 0, 0, 0])) {
                const dateOfBirth = new Date(date);
                const zodiacSigns = createZodiacSignsArray();
                for (let index in zodiacSigns) {
                    if (zodiacSigns[index].findZodiacSign(dateOfBirth.getMonth(), dateOfBirth.getDate())) {
                        signPicture = adjustImageAndName(
                            idSign, `${zodiacSigns[index].picture}`, idSingName, zodiacSigns[index].signName);
                    }
                }
        }
    }
    if(typeof signPicture === 'undefined'){
        addInnerHTML(idSingName, INVALID_INPUT_MESSAGE);
        document.getElementById(idSign).setAttribute('src', '');
    }
}

/**
 * Create and return particular zodiac sing image and it`s name
 * @param idPicture id of the picture of the zodiac sign
 * @param picturePath path name to the zodiac sign image
 * @param idName id of the zodiac sign name
 * @param name of the zodiac sign
 * @returns {HTMLElement} zodiac sign image
 */
function adjustImageAndName(idPicture, picturePath, idName, name) {
    let image = document.getElementById(idPicture);
    image.setAttribute('src', picturePath);
    addInnerHTML(idName, name);
    return image;
}

/**
 * Create an array of ZodiacSign objects with different
 * zodiac signs and return the array
 * @returns {Array} of ZodiacSign objects
 */
function createZodiacSignsArray() {
    let zodiacSigns = [];
    for (let i = 0; i < ZODIAC_SIGNS_RANGE.length; i++) {
        zodiacSigns.push(new ZodiacSign(new Date(`${RANDOM_YEAR}-${ZODIAC_SIGNS_RANGE[i][0]}-${ZODIAC_SIGNS_RANGE[i][1]}`),
            new Date(`${RANDOM_YEAR}-${ZODIAC_SIGNS_RANGE[i][2]}-${ZODIAC_SIGNS_RANGE[i][3]}`),
            (IMAGES_PATH + ZODIAC_SIGNS_RANGE[i][4].toLowerCase()) + IMAGES_FILE_FORMAT, ZODIAC_SIGNS_RANGE[i][4]));
    }
    return zodiacSigns;
}

// Task 8 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the dimensions of the board (in the format '8x8'). Print the chessboard.
 * @param id of the chess board div tag
 * @param idMessage of the error message p tag
 * @param dimensions how many rows and columns the chess board has
 */
function chessBoard(id, idMessage, dimensions) {
    if(isMatch(dimensions, MATCH_INPUT_DIMENSION)){
        const chessDimensions = dimensions.toString().toLowerCase().split('x');
        createChessBoard(id, chessDimensions[0], chessDimensions[1], CHESS_BOARD_CELL_SIZE_IN_PX);
        addInnerHTML(idMessage, '');
    } else {
        addInnerHTML(idMessage, INVALID_INPUT_MESSAGE);
    }
}

/**
 * Create chess board by calculating it's size and
 * adding all cells
 * @param id of the chess board div tag
 * @param rows how many rows at the chess board
 * @param columns how many cols at the chess board
 * @param sizeOfCell of the chess board
 */
function createChessBoard(id, rows, columns, sizeOfCell) {
    let chessBoard = document.getElementById(id);
    chessBoard.style.width = `${sizeOfCell * columns}px`;
    chessBoard.style.height = `${sizeOfCell * rows}px`;
    let wrapper = document.createElement('div');
    addCells(id, wrapper, rows, columns, sizeOfCell);
}

/**
 * Create black and white cells for chess board by given form
 * the user parameters
 * @param id of the chess board div tag
 * @param wrapper new chess board div
 * @param rows how many rows at the chess board
 * @param columns how many cols at the chess board
 * @param sizeOfCell of the chess board
 */
function addCells(id, wrapper, rows, columns, sizeOfCell) {
    for (let i = 0; i < rows; i++) {
        if(i % 2 === 0){
            for (let j = 0; j < columns; j++) {
                wrapper.appendChild(addCell(sizeOfCell, (j % 2 === 0) ? FIRST_CELL_COLOR : SECOND_CELL_COLOR));
            }
        } else {
            for (let j = 0; j < columns; j++) {
                wrapper.appendChild(addCell(sizeOfCell, (j % 2 !== 0) ? FIRST_CELL_COLOR : SECOND_CELL_COLOR));
            }
        }
    }
    document.getElementById(id).innerHTML = wrapper.innerHTML;
}

/**
 * Create black or white cell for chess board
 * @param size of the cell
 * @param color of the cell
 * @returns {HTMLElement} new cell
 */
function addCell(size, color) {
    let cell = document.createElement('div');
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    cell.style.background = color;
    return cell;
}

/**
 * Function for button that clear chess board
 * @param id of the tag witch we will clear
 */
function removeChessBoard(id) {
    let chessBoard = document.getElementById(id);
    chessBoard.innerHTML = '';
    chessBoard.style.width = '0px';
    chessBoard.style.height = '0px';
}

// Task 9 _ _ _ _ _ _ _ _ _ _ _

/**
 * Determine the entrance number and floor by apartment number.
 * The number of entrances, apartments on the entrances, the number of floors
 * of the house also sets the user in input.
 * @param entrances how many entrances in the building
 * @param apartOnFloor how many apartments on one floor
 * @param floors how many floors in the building
 * @param apartNumber witch we want to find
 * @param id of the tag that will show the result
 */
function apartmentMath(entrances, apartOnFloor, floors, apartNumber, id) {
    let input = [entrances, apartOnFloor, floors, apartNumber].map(Math.floor).filter((n) => n > 0);
    if(input.length === AMOUNT_OF_VALID_ARGUMENTS) { // if all input fields is correct
        if((input[0] * input[1] * input[2]) < input[3]){ // check if number of the apartment isn't to large
            addInnerHTML(id, WRONG_APARTMENT_NUMBER_MESSAGE);
        } else {
            let entrance = Math.ceil(input[3] / (input[2] * input[1]));
            let floor = Math.ceil((input[3] - (input[2] * input[1]) * (entrance - 1)) / input[1]);
            addInnerHTML(id, `${ENTRANCE_AND_FLOOR_NUM_MASSAGE}${entrance} entrance ${floor} floor`);
        }
    } else {
        addInnerHTML(id, INVALID_INPUT_MESSAGE);
    }
}

// Task 10 _ _ _ _ _ _ _ _ _ _ _

/**
 * Calculate the sum of the individual digits of the give from the user number
 * @param input number form the user
 * @param id of the tag that will show the result
 */
function sumOfDigits(input, id) {
    (isMatch(input, DIGIT)) ? addInnerHTML(id, `${DIGITS_SUM_MESSAGE}${input.replace(NOT_DIGIT, '').split('').map(Number)
        .reduce((accumulator, currentValue) => accumulator + currentValue)}`) : addInnerHTML(id, INVALID_INPUT_MESSAGE);
}

// Task 11 _ _ _ _ _ _ _ _ _ _ _

/**
 * In the textarea the user enters the links separated by commas.
 * When textarea becomes inactive, remove http:// and https:// from the links and
 * display them in a list of links sorted alphabetically.
 * @param links string from the user
 * @param id of the tag that will show the result
 */
function linksAlphabet(links, id) {
    let linksArray = links.replace(TWO_AND_MORE_COMMAS, ',').replace(WHITE_SPACE, '').replace(HTTP_S, '')
        .split(',').filter((i) => i !== '').sort();
    let linksList = document.createElement('div');
    for (let i = 0; i < linksArray.length; i++) {
        let link = document.createElement('a');
        link.setAttribute('href', `//${linksArray[i]}`);
        link.textContent = linksArray[i];
        linksList.appendChild(link);
        linksList.appendChild(document.createElement('br'));
    }
    document.getElementById(id).innerHTML = linksList.innerHTML;
}

/**
 * Function for button that clear added links
 * @param idTextArea witch will bee clear
 * @param idLinksList witch will bee clear
 */
function clearLinks(idTextArea, idLinksList) {
    clearTextArea(idTextArea);
    document.getElementById(idLinksList).innerHTML = '';
}

// General functions  _ _ _ _ _ _ _ _ _ _ _

/**
 * Check if string is match the given pattern
 * @param input string
 * @param pattern regex for expm
 * @returns {boolean} match or not
 */
function isMatch(input, pattern) {
    const result = input.match(pattern);
    return result !== null;
}

/*
Adding text to a HTML element by it`s id
 */
function addInnerHTML(id, text) {
    document.getElementById(id).innerHTML = text;
}

/*
Adding child to a HTML element by it`s id
 */
function appendChildById(id, child){
    document.getElementById(id).appendChild(child);
}

/*
The function returns the word that corresponds with
the numeric element of the date transmitted from the user.
(example: 2 года, 1 месяц, 3 дня, 5 часов, 10 минут, 15 секунд)
 */
function dateElementTail(element, dateElements) {
    const lastTwoIntegers = Number(element.toString().slice(-2));
    if(lastTwoIntegers >= 10 && lastTwoIntegers <= 20){
        return dateElements[2]; // лет, месяцев ...
    }
    const lastInteger = Number(element.toString().slice(-1));
    if(lastInteger === 1){
        return dateElements[0]; // год, месяц ...
    } else if(lastInteger >= 2 && lastInteger <= 4){
        return dateElements[1]; // года, месяца ...
    }
    return dateElements[2]; // лет, месяцев ...
}

/**
 * Clear the value of input html tag
 * @param id of the html tap
 */
function clearTextArea(id) {
    document.getElementById(id).value = '';
}

/**
 * Class created to help us to find zodiac sing
 */
class ZodiacSign {
    constructor(firstDate, secondDate, picture, signName) {
        this._firstDate = new Date(firstDate);
        this._secondDate = new Date(secondDate);
        this._signName = signName;
        this._picture = picture;
    }

    get picture() {
        return this._picture;
    }

    get signName() {
        return this._signName;
    }

    findZodiacSign(month, day) {
        if(this._firstDate.getMonth() === month && day >= this._firstDate.getDate()){
            return true;
        } else if(this._secondDate.getMonth() === month && day <= this._secondDate.getDate()) {
            return true;
        }
        return false;
    }
}