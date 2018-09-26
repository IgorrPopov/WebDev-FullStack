const SECONDS_IN_HOUR = 3600, SECONDS_IN_MINUTE = 60;

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

function age(years) {
    document.getElementById('task5').innerHTML = `${years} ${ageLogic(years)}`;
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
