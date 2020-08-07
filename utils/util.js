var regex = {
    email: '^[A-Z|a-z|\\d]{1,}@[A-Z|a-z|\\d]{1,}.[A-Z|a-z|\\d]{1,}$'
}

var validateRegex = function(value, regex) {
    try {
        var pattern = new RegExp(regex);
        return pattern.test(value)
    } catch (e) {
        console.log('ERROR ::: ', e);
        return false
    }

}

module.exports = {regex, validateRegex};