// ** Common functions used through the project

/**
 * Load a dependency from an object repository
 * @param objectRepository object repository
 * @param propertyName dependency name
 * @returns {*}
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    //throw new TypeError(propertyName + ' required');
    console.log('TypeError (' + propertyName + ' required)');
}

function multiLine(string) {
    while (string.indexOf("\r\n") !== -1) {
        string = string.replace("\r\n", "<br/>");
    }

    return string;
}

module.exports.requireOption = requireOption;
module.exports.multiLine = multiLine;

