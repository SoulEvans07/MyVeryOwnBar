/**
 * Using the template engine render the values into the template
 */

module.exports = function (objectrepository, viewName) {

    return function (req, res) {
        // console.log('render( ' + viewName + ' )');
        // res.end(JSON.stringify(res.tpl));
        res.render(viewName, res.tpl);
    };

};
