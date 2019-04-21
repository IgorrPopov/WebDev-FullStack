
function Logger(level, message, service, serverResponse = 'none', responseCode = '200') {
    this.date_time = getDateTime();
    this.level = level;
    this.message = message;
    this.service = service;
    this.user_id = userId;
    this.response_code = responseCode;
    this.server_response = serverResponse;
}

const printLog = (logger, printLine = true, color = 'green') => {
    for (let key in logger) {
        if (logger.hasOwnProperty(key)) {
            if (key === 'server_response' && typeof logger[key] === 'object') {
                console.log('%c- - - - - - server response - - - - - -', 'color: blue');
                printLog(logger[key], false, 'blue');
                continue;
            }
            console.log('%c[' + key + ']' + ' ' + logger[key], 'color: ' + color);
        }
    }

    if (printLine) {
        console.log('%c_______________________________________', 'color: ' + color);
    }
};

const getDateTime = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} / ${hour}:${minutes}:${seconds}`;
};