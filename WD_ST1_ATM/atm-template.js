/* witch function used by the user */
const ACTIONS = new Map([
    ['auth', 'authentication'],
    ['check', 'check balance'],
    ['getCash', 'receiving money'],
    ['loadCash', 'recharge user account'],
    ['load_cash', 'ATM cash replenishment'],
    ['getReport', 'session report'],
    ['logout', 'logout']
]);
/* all messages to user and to reports */
const INFO = new Map([
    ['isAuth', ['To do this action, you need to authorize', 'action of an unauthorized user']],
    ['isLogged', ['You already logged in', 'multiple attempt to log in']],
    ['isNotAdmin', ['This action isn\'t allowed for admin', 'attempt get cash by the admin user']],
    ['isValidAmount', ['You entered invalid number', 'invalid input']],
    ['isEnoughCashATM', ['ATM doesn\'t have enough money', 'not enough money in the ATM']],
    ['isEnoughCash', ['You don\'t have enough money', 'user doesn\'t have enough money']],
    ['isNotUser', ['This action isn\'t allowed for user', 'attempt to load cash to AMT by not an admin user']],
    ['isUserInputString', ['Username and password must be Strings', 'not String input']],
    ['isNumberString', ['The number must be passed as a String', 'not String input']],
    ['userInput', ['Your input is invalid', 'invalid input during logging']],
    ['verification', ['You entered an incorrect password or username', 'entered wrong password or login']],
    ['logged in', ['You logged in', 'successful login']],
    ['checked debet', ['Current debet: ', 'current debet ']],
    ['Get your money', ['Get your money! Balance: ', 'cash withdrawal, balance: ']],
    ['replenished balance', ['Account replenished, balance: ', 'account replenished, balance: ']],
    ['replenished ATM balance', ['AMT cash balance increased to: ', 'AMT cash balance increased to: ']],
    ['get report', ['___________________________________', 'got report']],
    ['logged out', ['Logged out', 'logged out']]
]);
/* colors of messages */
const ERROR_COLOR = 'red', VALID_COLOR = 'green', REPORT_COLOR = 'blue';
/* name of the error (name of the function witch identify an error) */
let current_error = false;

const ATM = {
    is_auth: false,
    current_user:false,
    current_type:false,

    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],
    // An array with all reports of the current session
    reports: [],
    // authorization
    auth: function(number, pin) {
        this.addReport(checks(['isLogged', 'isUserInputString',
            'userInput', 'verification'], [number, pin, this]) ?
            log('auth', 'logged in') : log('auth', current_error));
    },
    // check current debet
    check: function() {
        this.addReport(checks(['isAuth'], [this]) ?
            log('check', 'checked debet', this.current_user.debet) :
            log('check', current_error));
    },
    // get cash - available for user only
    getCash: function(amount) {
        const gettingCash = (amount) => {
            this.cash -= Number(amount);
            this.current_user.debet -= Number(amount);
            return log('getCash', 'Get your money', this.current_user.debet);
        };
        this.addReport(checks(['isAuth', 'isNotAdmin', 'isNumberString', 'isValidAmount',
            'isEnoughCashATM', 'isEnoughCash'], [this, amount]) ?
            gettingCash(amount) : log('getCash', current_error));
    },
    // load cash - available for user only
    loadCash: function(amount){
        const loadAccount = (amount) => {
            this.cash += Number(amount);
            this.current_user.debet += Number(amount);
            return log('loadCash', 'replenished balance', this.current_user.debet);
        };
        this.addReport(checks(['isAuth', 'isNotAdmin', 'isNumberString', 'isValidAmount'],
            [this, amount]) ? loadAccount(amount) : log('loadCash', current_error));
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        const loadToATM = (addition) => {
            this.cash += Number(addition);
            return log('load_cash', 'replenished ATM balance', this.cash);
        };
        this.addReport(checks(['isAuth', 'isNotUser', 'isNumberString', 'isValidAmount'],
            [this, addition]) ? loadToATM(addition) : log('load_cash', current_error));
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        const reports = () => this.reports.forEach(
            (element, i) => log('', `${++i}) ${element.getReport()}\n`, REPORT_COLOR));
        this.addReport(checks(['isAuth', 'isNotUser'], [this]) ? (reports(),
                log('getReport', 'get report')) :
            log('getReport', current_error));
    },
    // log out
    logout: function() {
        if(checks(['isAuth'], [this])) {
            this.addReport(log('logout', 'logged out'));
            this.current_user = false;
            this.current_type = false;
            this.is_auth = false;
        } else {
            this.addReport(log('logout', current_error));
        }
    },
    // adding report of each action of the user
    addReport: function (action) {
        this.reports.push(
            new Report(new Date().toISOString().replace('T', ', ').slice(0, -5),
                (this.is_auth) ? this.current_user.number : 'anon', action));
    }
};
/* loop all checks in current action of the user */
function checks(functions, params) {
    for (let i = 0; i < functions.length; i++) {
        current_error = functions[i];
        if(!window[functions[i]](params)){
            return false;
        }
    }
    current_error = false;
    return true;
}

/* list of all checks */
function isLogged(input) { return !input[2].is_auth; }

function isAuth(input) { return input[0].is_auth; }

function isNotAdmin(input) { return input[0].current_type !== 'admin'; }

function isNotUser(input) { return input[0].current_type === 'admin'; }

function isEnoughCashATM(input) { return input[1] <= input[0].cash; }

function isEnoughCash(input) { return input[1] <= input[0].current_user.debet; }

function isValidAmount(input) { return (/^[1-9]([0-9]*)$/.test(input[1]) && input[1] > 0); }

function isNumberString(input) { return typeof input[1] === 'string';}

function isUserInputString(input) {
    return typeof input[0] === 'string' && typeof input[1] === 'string';
}

function userInput(input){
    return !!(/^[0-9][0-9]{3}$/.test(input[0]) && /^[0-9][0-9]{2}$/.test(input[1]));
}

function verification(input) {
    const ATM = input[2], number = input[0], pin = input[1];
    ATM.current_user =
        ATM.users.find((u) => u.pin ===  pin && u.number === number);
    if(ATM.current_user){
        ATM.is_auth = true;
        ATM.current_type = ATM.current_user.type;
        return true;
    }
    return false;
}
/* console.log all actions and reports */
function log(action, massage, debet = -1) {
    const color = (current_error) ? ERROR_COLOR : VALID_COLOR;
    if(action === ''){ // reports
        console.log(`%c${massage}`, `color: ${REPORT_COLOR}`);
    } else if (debet === -1) { // without numbers
        console.log(`%c${INFO.get(massage)[0]}`, `color: ${color}`);
        return ACTIONS.get(action) + ': ' + INFO.get(massage)[1];
    } else { // with numbers
        console.log(`%c${INFO.get(massage)[0]}${debet}`, `color: ${color}`);
        return ACTIONS.get(action) + ': ' + INFO.get(massage)[1] + debet;
    }
}

/* class for reports */
class Report {
    constructor(time, user, action){
        this.time = time;
        this.user = user;
        this.action = action;
    }

    getReport(){
        return `${this.time}; user: ${this.user}; AMT operation -> ${this.action}`;
    }
}