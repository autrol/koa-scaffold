'use strict';

module.exports = function (router) {    
    router.get('/', function* (next) {
        yield this.render('demo_page/index', {
            data: '模版变量'
        });
    });

    router.get('/inner_demo_page', function* (next) {
        yield this.render('demo_page/inner_demo_page/index');
    });
};