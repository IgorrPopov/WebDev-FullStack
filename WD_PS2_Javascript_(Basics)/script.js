const SECONDS_IN_HOUR = 3600, SECONDS_IN_MINUTE = 60;

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
                'august', 'september', 'october', 'november', 'december'];

const MATCH_INPUT_DATE = /^[jfmasondJFMASOND][a-zA-Z]{2,8}\s[0-9]{1,2},\s[0-9]*\s[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/g;

const DAYS_OF_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const DAYS_IN_YEAR = 365;

const DAYS_IN_MONTH = 31;

// first task sum from -10000 to 10000
// second task find sum of the numbers from -1000 to 1000,
// summing only the numbers  that end at 2, 3, and 7
function addition(taskNumber, condition) {
    let sum = 0;
    if(condition) {
        for (let i = -10000; i <= 10000; i++) {
            sum += i;
        }
    } else {
        for (let i = -10000; i <= 10000; i++){
            let temp = Number(i.toString().split('').pop());
            if(temp === 2 || temp === 3 || temp === 7) {
                sum += i;
            }
        }
    }
    document.getElementById(taskNumber).innerHTML = `Result of addition: ${sum}`;
}


function printTriangle() {
    let triangle = document.createElement('p');
    let v = '';
    for (let i = 0; i < 50 ; i++) {
        for (let j = 0; j <= i ; j++) {
            v += '*';
        }
        triangle.appendChild(document.createTextNode(v));
        triangle.appendChild(document.createElement('br'));
        v = '';
    }
    document.getElementById('assignment__task3').appendChild(triangle);
}

function convertSeconds(s) {
    let seconds = Number(s.replace(',', '.'));
    if(!isNaN(seconds) && seconds > 0){
        document.getElementById('task4').innerHTML = 'Output format: ' + convertTimeFormat(seconds);
    } else {
        alert('Please enter a positive number greater than zero!');
    }
}

function convertTimeFormat(seconds) {
    let hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds -= hours * SECONDS_IN_HOUR;
    let minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    seconds = Math.floor(seconds - (minutes * SECONDS_IN_MINUTE));
    let timePart = input => input <= 9 ? `0${input}` : input;
    return timePart(hours) + ':' + timePart(minutes) + ':' + timePart(seconds);
}

function age(y) {
    let years = Number(y.replace(',', '.'));
    (!isNaN(years) && (years = Math.floor(years)) > 0) ?
        document.getElementById('task5').innerHTML = `${years} ${ageLogic(years)}` :
        alert('Please enter a positive number greater than zero!');
}

function ageLogic(years) {
    return (years >= 5 && years <= 19) ? 'лет' : age20andOlder(years);
}

function age20andOlder(years) {
    let lastInteger = Number(years.toString().split('').pop());
    if(lastInteger === 1){
        return 'год';
    } else if(lastInteger >= 2 && lastInteger <= 4){
        return 'года';
    }
    return 'лет';
}

function random(date) {
    for (let i = 0; i < 10; i++) {
        let string = createString();
        let string2 = createString();
        timeInterval(string, string2);
        console.log('---------------------');
    }
}

function createString() {
    let month = MONTHS[Math.floor((Math.random() * 11))];
    let day = Math.floor((Math.random() * 31) + 1);
    let year = Math.floor((Math.random() * 2018) + 1);
    let hours = Math.floor((Math.random() * 23) + 1);
    let min = Math.floor((Math.random() * 59) + 1);
    let sec = Math.floor((Math.random() * 59) + 1);
    // October 13, 2014 11:13:00
    return `${month} ${day}, ${year} ${hours}:${min}:${sec}`;
}

function calculatingDateDifference(startDate, finishDate) {
    let yearsDifference = finishDate[2] -  startDate[2] - 1;
    // if(yearsDifference < 0) alert('The year of the beginning of the period of time ' +
    //     'is more than the year of the end of the period! Please try again!');
    let monthsDifference = MONTHS.length - startDate[0] + finishDate[0] - 1;
    let daysDifference = DAYS_OF_MONTHS[startDate[0] - 1] - startDate[0] + finishDate[0] - 1;
    console.log('days 114 -------- ' + daysDifference);
    let hoursDifference = 24 - startDate[3] + finishDate[3] - 1;
    if(startDate[0] === 2 && startDate[2] % 4 === 0 ){ // if february and leap year
        daysDifference++;
        console.log('leap');
    }
    console.log('days 120 -------- ' + daysDifference);
    let minutesDifference = 60 - startDate[4] + finishDate[4] - 1;
    let secondsDifference = 60 - startDate[5] + finishDate[5];

    if(secondsDifference >= 60) {
        secondsDifference -= 60;
        minutesDifference++;
    }
    if(minutesDifference >= 60) {
        minutesDifference -= 60;
        hoursDifference++;
    }
    if(hoursDifference >= 24){
        hoursDifference -= 24;
        daysDifference++;
    }
    console.log('days 136 -------- ' + daysDifference);
    if(daysDifference >= 31){
        daysDifference -= 31;
        monthsDifference++;
    }
    console.log('days -------- ' + daysDifference);
    if(monthsDifference >= 12) {
        monthsDifference -= 12;
        yearsDifference++;
    }

    console.log('yearsDifference: ' + yearsDifference);
    console.log('monthsDifference: ' + monthsDifference);
    console.log('daysDifference: ' + daysDifference);
    console.log('hoursDifference: ' + hoursDifference);
    console.log('minutesDifference: ' + minutesDifference);
    console.log('secondsDifference: ' + secondsDifference);
}

function timeInterval(firstDate, secondDate) {
    if(isMatch(firstDate) && isMatch(secondDate)){
        let startDate = checkDate(convertStringToArray(firstDate));
        let finishDate = checkDate(convertStringToArray(secondDate));
        if(startDate !== null && finishDate !== null){
            console.log('Result 1: ' + startDate + "    String: " + firstDate);
            console.log('Result 2: ' + finishDate + "    String: " + secondDate);
            calculatingDateDifference(startDate, finishDate);
        } else {
            console.log('Error 1! ' + firstDate + "    " +  secondDate);
            //alert('You entered dates with errors! Please check the data and try again.');
        }
    } else {
        console.log('Error 2! ' + firstDate + "    " +  secondDate);
        //alert('You entered dates with errors! Please check the data and try again.');
    }
}

function isMatch(date) {
    const d = date.match(MATCH_INPUT_DATE);
    return d !== null;
}

function convertStringToArray(data) {
    let result = [];
    let num = '';
    for (let i = 0; i < data.length; i++) {
        if(data[i] !== ',' && data[i] !== ' ' && data[i] !== ':'){
            num += data[i];
        } else {
            if(num.length !== 0) {
                result.push(num);
                num = '';
            }
        }
    }
    result.push(num);
    return result;
}

//October 13, 2014 11:13:00
function checkDate(dateArray) {
    if(checkMonth(dateArray[0].toLowerCase())){
        let intDate = [];
        intDate.push(MONTHS.indexOf(dateArray[0].toLowerCase()) + 1); // month
        for (let i = 1; i < dateArray.length; i++) {
            intDate.push(Number(dateArray[i]));
        }
        if(isNaN(intDate[2]) || intDate[2] < 0) return null; // year
        if(isNaN(intDate[1]) || !checkDay(intDate[1], intDate[0], intDate[2])) return null; // day
        if(isNaN(intDate[3]) || intDate[3] < 0 || intDate[3] > 23) return null; // hour
        if(isNaN(intDate[4]) || intDate[4] < 0 || intDate[4] > 59) return null; // min
        if(isNaN(intDate[5]) || intDate[5] < 0 || intDate[5] > 59) return null; // sec
        return intDate;
    }
    return null;
}

function checkDay(day, month, year) {
    //console.log('checkDay start!');
    if(month === 2) { // february
        if(year % 4 === 0){
            return day > 0 && day <= 29; // leap year
        }
        return day > 0 && day <= 28; // not leap year
    }
    let longMonths = [1, 3, 5, 7, 8, 10, 12];
    for (let i = 0; i < longMonths.length; i++) {
        if(longMonths[i] === month){
            return day > 0 && day <= 31;
        }
    }
    //console.log(day > 0 && day <= 30);
    return day > 0 && day <= 30;
}

function checkMonth(inputMonth) {
    let trueMonth = MONTHS.filter(month => month === inputMonth);
    return trueMonth.length > 0;
}





// function chessBoard() {
//     let chessDimension = Number(document.getElementById('chessDimension').value);
//     console.log(typeof chessDimension);
//     console.log(chessDimension);
//
//     if(Number.isInteger(chessDimension) && chessDimension > 0){
//         printChessBoard(chessDimension);
//     } else {
//         alert('Please enter a positive integer greater than zero!');
//     }
//
//     function printChessBoard(chessDimension) {
//
//     }
// }




function timeIntervals(date1, date2) {
    const startDate = new Date(date1);
    const finishDate = new Date(date2);
    document.getElementById('task6').innerHTML = 'startDate: ' + startDate + '\n' + ' finishDate: ' + finishDate;
}