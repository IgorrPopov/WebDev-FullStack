const MATCH_LOGIN = /^[0-9][0-9]{3}/g;
const MATCH_PIN = /^[0-9][0-9]{2}/g;
const USER_INDEX = 1;

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
    // authorization
    auth: function(number, pin) {
        if(this.is_auth){
            return 'You are already in the system!';
        }
        else if(isMatch(number, MATCH_LOGIN) && isMatch(pin, MATCH_PIN)){
            if(this.users[USER_INDEX].pin === pin && this.users[USER_INDEX].number === number){
                this.is_auth = true;
                return 'You are log in!';
            } else {
                return 'You entered wrong pin or login!';
            }
        } else {
            return 'Invalid input!';
        }
    },
    // check current debet
    check: function() {
        return (this.is_auth) ? 'Your account debet is: ' +
            this.users[USER_INDEX].debet : 'You must log in before checking your account debet!';
    }
    ,
    // get cash - available for user only
    getCash: function(amount) {
        if(this.is_auth){
            if(!isNaN(amount) && amount > 0){
                if(amount <= this.cash){
                    if(amount > this.users[USER_INDEX].debet){
                        return 'You do not have that amount of money!';
                    } else {
                        this.users[USER_INDEX].debet -= amount;
                        this.cash += amount;
                        console.log('Take your money: ' + amount);
                        return 'Your debet is: ' + this.users[USER_INDEX].debet;
                    }
                } else {
                    return "ATM don't have enough money!"
                }
            } else {
                return 'Invalid input!';
            }
        } else {
            return 'You must log in before getting our cash!'
        }
    },
    // load cash - available for user only
    loadCash: function(amount){
        if(this.is_auth){
            if(!isNaN(amount) && amount > 0){
                this.users[USER_INDEX].debet += amount;
                this.cash += amount;
                return 'Your debet is: ' + this.users[USER_INDEX].debet;
            } else {
                return 'Invalid input!';
            }
        } else {
            return 'You must log in before getting our cash!'
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
 
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
 
    },
    // log out
    logout: function() {
        if(this.is_auth){
            this.is_auth = false;
            return 'You log out!';
        } else {
            return 'You must log in before getting out!'
        }
    }
};

function isMatch(d, match) {
    const result = d.match(match);
    return result !== null;
}