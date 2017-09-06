"use strict";

module.exports = function (router) {    
    router.get('/', function* (next) {
        yield this.render('page2/index');
    });
};