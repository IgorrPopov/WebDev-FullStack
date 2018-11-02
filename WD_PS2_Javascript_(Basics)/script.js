// Text message
const INVALID_INPUT_MESSAGE = 'Invalid input, please try again!';
// Arrays with time units names
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december'];
const DATE_ELEMENTS_NAMES = [['год', 'года', 'лет'], ['месяц', 'месяца', 'месяцев'],
    ['день', 'дня', 'дней'], ['час', 'часа', 'часов'], ['минута', 'минуты', 'минут'],
    ['секунда', 'секунды', 'секунд']];
// Numeric constants
const MONTHS_IN_YEAR = 12;
const HOURS_RANGE = 23;
const MINUTES_AND_SECONDS_RANGE = 59;
const RANDOM_YEAR = 1000;

// Tasks 1 & 2 _ _ _ _ _ _ _ _ _ _ _

/**
 * First task -  sum from -10000 to 10000.
 * Second task - find sum of the numbers from -1000 to 1000,
 * summing only the numbers  that end at 2, 3, and 7
 * @param id of the tag that will show the result
 * @param condition - addition with condition or not
 */
function addition(id, condition = false) {
    let sum = 0;
    const getNum = number => (!condition || [2, 3, 7].includes(Math.abs(number % 10))) ? number : 0;
    for (let i = -1000; i <= 1000; i++) {
        sum += getNum(i);
    }
    addInnerHTML(id, `Result of addition: ${sum}`);
}

// Task 3 _ _ _ _ _ _ _ _ _ _ _

/**
 * Display on the page a list of 50 '*' elements of the triangle form
 * @param id of the tag that will show the triangle
 */
function printTriangle(id) {
    let stars = '';
    for (let i = 0; i <= 50 ; i++) {
        stars = stars.padEnd(stars.length + i, '*') + '\n';
    }
    document.getElementById(id).innerText = stars;
}

// Task 4 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the time in seconds. Output in the format: hh: mm: ss  (01:05:20)
 * @param id of the tag that will show the result
 * @param seconds given from the user
 */
function convertSeconds(id, seconds) {
    (/^\d+$/.test(seconds) && !(seconds.length > 1 && seconds[0] === '0')) ?
        addInnerHTML(id, `Output format: ${convertTimeFormat(seconds)}`) :
        addInnerHTML(id, INVALID_INPUT_MESSAGE);
}

/**
 * Convert seconds to suitable format
 * @param totalSeconds given from the user
 * @returns {string} looks like this '00:12:01'
 */
function convertTimeFormat(totalSeconds) {
    const secondsInHour = 3600, secondsInMinute = 60;
    const hours = Math.floor(totalSeconds / secondsInHour);
    totalSeconds -= hours * secondsInHour;
    const minutes = Math.floor(totalSeconds / secondsInMinute);
    const seconds = Math.floor(totalSeconds - (minutes * secondsInMinute));
    return timePart(hours) + ':' + timePart(minutes) + ':' + timePart(seconds);
}

// Task 5 _ _ _ _ _ _ _ _ _ _ _

/**
 * For the given age of the student, prints the phrase "22 года" (1 год, 20 лет.... etc.)
 * @param id of the tag that will show the result
 * @param years (age) of the student
 */
function age(id, years) {
    (/^[1-9]([0-9]*)$/.test(years)) ?                                         // 'год', 'года', 'лет'
        addInnerHTML(id, `Возраст студента: ${years} ${dateElementTail(years, DATE_ELEMENTS_NAMES[0])}`) :
        addInnerHTML(id, INVALID_INPUT_MESSAGE);
}

// Task 6 _ _ _ _ _ _ _ _ _ _ _

/**
 * Find the difference between two dates
 * @param id of the tag that will show the result
 * @param firstDateInput added by the user or generated randomly
 * @param secondDateInput added by the user or generated randomly
 */
function timeInterval(id, firstDateInput, secondDateInput) {
    const matchDate = /^[\w]{3,9}\s[\d]{1,2},\s[\d]{4}\s[\d]{2}:[\d]{2}:[\d]{2}$/;
    if(matchDate.test(firstDateInput) && matchDate.test(secondDateInput)){ // check input format
        let dateOne = (!isNaN(Date.parse(firstDateInput))) ? new Date(firstDateInput) : false;
        let dateTwo = (!isNaN(Date.parse(secondDateInput))) ? new Date(secondDateInput) : false;
        if(dateOne && dateTwo) { // check if date objects are not 'Invalid Date'
            changeDateObject(); // add one function and one property to the Date object
            let dates = checkDates([dateOne, dateTwo], [firstDateInput, secondDateInput], /[\s,:]+/);
            if(dates[0].validDate() && dates[1].validDate()){ // if input and date objects have the same dates
                dates.map(a => a.dateArray[0]++); // turns months indexes to numbers of months in order
                return calculatingDateDifference(id, dates[0].dateArray, dates[1].dateArray);
            }
        }
    }
    addInnerHTML(id, 'You entered dates with errors! Please check the input and try again.');
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
    addInnerHTML(id, `Между датами прошло${resultString}`);
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
    const dateArrayIndexes = [2, 0, 1, 3, 4, 5]; // from years to seconds
    for (let i = 0; i < dateArrayIndexes.length; i++) {
        if(firstDate[dateArrayIndexes[i]] > secondDate[dateArrayIndexes[i]]){
            return true;
        }
        if (firstDate[dateArrayIndexes[i]] < secondDate[dateArrayIndexes[i]]) {
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

// Task 7 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the date in the format of 2014-12-31,
 * and receives a zodiac sign of that day (with a picture).
 * @param idSign id of the zodiac sign image
 * @param idSingName name of the zodiac sign
 * @param dateInput of birth given form the user
 */
function zodiacSigns(idSign, idSingName, dateInput) {
    let validSign = false;
    if(/^\d{4}-\d{1,2}-\d{1,2}$/g.test(dateInput)){ // check input format
        let date = (!isNaN(Date.parse(dateInput))) ? new Date(dateInput) : false;
        if(date) { // check if date object is not 'Invalid Date'
            changeDateObject();
            date = checkDates([date], [rearrangeDateInput(dateInput, '-')], '-');
            if(date[0].validDate()){
                validSign = findAndPrintZodiacSing(date[0], idSign, idSingName);
            }
        }
    }
    if(!validSign){
        addInnerHTML(idSingName, INVALID_INPUT_MESSAGE);
        document.getElementById(idSign).setAttribute('src', '');
    }
}

/***
 * Create suitable string date for checkDates() function
 * @param dateInput input from the user
 * @param splitter split the input date
 * @returns {string} suitable for checkDates() function string
 */
function rearrangeDateInput(dateInput, splitter) {
    let result = dateInput.split(splitter);
    [result[0], result[1], result[2]] = [result[1], result[2], result[0]];
    result[0]--; // '--' month to an index
    return `${result[0]}-${result[1]}-${result[2]}`;
}

/**
 * Determine particular zodiac sign and print the name of
 * the sing and the picture of the sign
 * @param date object
 * @param idSign id of the picture of the zodiac sign
 * @param idSingName id of the zodiac sign name
 * @returns {boolean} only true
 */
function findAndPrintZodiacSing(date, idSign, idSingName) {
    const sings =  [
        [21, 'Aquarius'],
        [20, 'Pisces'],
        [21, 'Aries'],
        [21, 'Taurus'],
        [22, 'Gemini'],
        [22, 'Cancer'],
        [24, 'Leo'],
        [24, 'Virgo'],
        [24, 'Libra'],
        [24, 'Scorpio'],
        [23, 'Sagittarius'],
        [22, 'Capricorn']
    ];
    const index = (i, array) => (i !== 0) ? i - 1 : array.length - 1; // prevents wrong index of an array
    for (let i = 0; i < sings.length; i++) {
        if(date.getMonth() === i) {
            const picture = (date.getDate() >= sings[i][0]) ? sings[i][1] : // if date is bigger or equal
                sings[index(i, sings)][1]; // if not, take previous sign
            adjustImageAndName(idSign, `pictures/${picture.toLowerCase()}.jpg`, idSingName, picture);
            return true;
        }
    }
}

/**
 * Create and return particular zodiac sing image and it`s name
 * @param idPicture id of the picture of the zodiac sign
 * @param picturePath path name to the zodiac sign image
 * @param idName id of the zodiac sign name
 * @param name of the zodiac sign
 */
function adjustImageAndName(idPicture, picturePath, idName, name) {
    let image = document.getElementById(idPicture);
    image.setAttribute('src', picturePath);
    addInnerHTML(idName, name);
}

// Task 8 _ _ _ _ _ _ _ _ _ _ _

/**
 * The user enters the dimensions of the board (in the format '8x8'). Print the chessboard.
 * @param id of the chess board div tag
 * @param idMessage of the error message p tag
 * @param chessDimensions how many rows and columns the chess board has
 */
function chessBoard(id, idMessage, chessDimensions) {
    const maxSize = 30, cellSizePx = 40;
    if(/^[1-9][0-9]*[xX][1-9][0-9]*$/g.test(chessDimensions)){
        const dimensions = chessDimensions.toString().toLowerCase().split('x');
        if(dimensions[0] > maxSize || dimensions[1] > maxSize){
            addInnerHTML(idMessage,
                'The dimensions of the chessboard are to large! Max size is ' + maxSize + '.');
        } else {
            createChessBoard(id, dimensions[0], dimensions[1], cellSizePx);
            addInnerHTML(idMessage, '');
        }
    } else {
        removeChessBoard(id);
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
        for (let j = 0; j < columns; j++) {
            wrapper.appendChild(addCell(sizeOfCell, (j % 2) === (i % 2) ? '#000000' : '#ffffff'));
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
    const amountOfValidArguments = 4;
    if(input.length === amountOfValidArguments) { // if all input fields is correct
        if((input[0] * input[1] * input[2]) < input[3]){ // check if number of the apartment isn't to large
            addInnerHTML(id, 'Wrong apartment number! The building has no apartment with this number.');
        } else {
            let entrance = Math.ceil(input[3] / (input[2] * input[1]));
            let floor = Math.ceil((input[3] - (input[2] * input[1]) * (entrance - 1)) / input[1]);
            addInnerHTML(id, `Entrance and floor numbers ${entrance} entrance ${floor} floor`);
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
    (/\d/.test(input)) ? addInnerHTML(id, `The sum of digits: ${input.replace(/\D/g, '').split('').map(Number)
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
    let linksArray = links.replace(/,{2,}/, ',').replace(/\s/g, '').replace(/http[s]?:[/]+/g, '')
        .split(',').filter((i) => i !== '').sort();
    let linksList = document.createElement('div');
    for (let i = 0; i < linksArray.length; i++) {
        let link = document.createElement('a');
        link.style.color = 'white';
        link.setAttribute('href', `http://${linksArray[i]}`);
        link.setAttribute('target', '_blank"');
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

/*
Adding text to a HTML element by it`s id
 */
function addInnerHTML(id, text) {
    document.getElementById(id).innerHTML = text;
}

/*
 * The function returns the word that corresponds with
 * the numeric element of the date transmitted from the user.
 * (example: 2 года, 1 месяц, 3 дня, 5 часов, 10 минут, 15 секунд)
 * @param element of the date
 * @param dateTails an array like ['год', 'года', 'лет']
 * @returns {*} tail (word) for date or time element
 */
function dateElementTail(element, dateTails) {
    if (element % 100 >= 10 && element % 100 <= 20) {
        return dateTails[2];
    }
    if (element % 10 === 1) {
        return dateTails[0];
    }
    return (element % 10 >= 2 && element % 10 <= 4) ? dateTails[1] : dateTails[2];
}

/**
 * Clear the value of input html tag
 * @param id of the html tap
 */
function clearTextArea(id) {
    document.getElementById(id).value = '';
}

/**
 * Adding zero if time element less than 10
 * @param input time element
 * @returns {string} two digit string
 */
function timePart(input) {
    return input <= 9 ? `0${input}` : input; // add zero if we have one digit
}

/**
 * Add one function and one property to Date object
 */
function changeDateObject() {
    Date.prototype.dateArray = [];
    Date.prototype.validDate = function () {
        const functions = [this.getMonth(), this.getDate(), this.getFullYear(), this.getHours(),
            this.getMinutes(), this.getSeconds()];
        if(this.dateArray.length > 0) {
            for (let i = 0; i < this.dateArray.length; i++) {
                if(functions[i] !== this.dateArray[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
}

/**
 * Change dateArray property by splitting user`s input and
 * create from it an array
 * @param dates Date objects
 * @param datesInput input form the user
 * @param splitter unit that helps us to split user`s input
 * @returns {*} Date object with new dateArray property
 */
function checkDates(dates, datesInput, splitter) {
    for (let i = 0; i < dates.length; i++) {
        const dateArray = datesInput[i].split(splitter);
        if(isNaN(dateArray[0])){ // if month is a word and not a number
            dateArray[0] = MONTHS.indexOf(dateArray[0].toLowerCase()); // turns month word to number
        }
        dates[i].dateArray = dateArray.map(Number);
    }
    return dates;
}

/**
 * Create and add to text fields random dates for testing
 * @param firstDateId id of the first date text field
 * @param secondDateId id of the second date text field
 */
function randomDate(firstDateId, secondDateId = '') {
    if(secondDateId === ''){
        document.getElementById(firstDateId).value = createDate(true);
    } else {
        document.getElementById(firstDateId).value = createDate();
        document.getElementById(secondDateId).value = createDate();
    }
}

/**
 * Create string with random date
 * @returns {string} like: "October 13, 2014 11:13:00" or "2014-12-31"
 */
function createDate(zodiac = false) {
    const month = MONTHS[Math.floor((Math.random() * (MONTHS_IN_YEAR )))];
    const year = Math.floor((Math.random() * RANDOM_YEAR) + 1500);
    const elementRanges = dateElementRanges(MONTHS.indexOf(month) + 1, year);
    const day = Math.floor((Math.random() * elementRanges[1]) + 1);
    if(zodiac) {
        return `${year}-${MONTHS.indexOf(month) + 1}-${day}`;
    }
    const hours = Math.floor((Math.random() * HOURS_RANGE) + 1);
    const min = Math.floor((Math.random() * MINUTES_AND_SECONDS_RANGE) + 1);
    const sec = Math.floor((Math.random() * MINUTES_AND_SECONDS_RANGE) + 1);
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${
        day}, ${year} ${timePart(hours)}:${timePart(min)}:${timePart(sec)}`;
}

/**
 * Create an array with ranges of each element of the date
 * @param month to check if it's february
 * @param year to check if it's leap year
 * @returns {number[]} an array with ranges
 */
function dateElementRanges(month, year) {
    const secInMinAndMinInHour = 60, hoursInDay = 24, february = 2, leapYear = 4,
        daysOfEachMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dateElementRanges = [MONTHS_IN_YEAR, daysOfEachMonths[month - 1],
        hoursInDay, secInMinAndMinInHour, secInMinAndMinInHour];
    if (month === february && year % leapYear === 0) { // if february and leap year
        dateElementRanges[1]++;
    }
    return dateElementRanges;
}