'use strict';

module.exports = function (router) {    
    router.get('/', function* (next) {
        yield this.render('page1/index');
    });

    router.get('/sub_page1', function* (next) {
        yield this.render('page1/sub_page1/index');
    });
};