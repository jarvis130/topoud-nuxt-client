module.exports = {
    mobile: /^1\d{10}$/,
    email: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/,
    password: /^.*(?=.{8,32})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
    ip: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))).){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/
}
