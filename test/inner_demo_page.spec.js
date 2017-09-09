var app = require('../server');
var supertest = require('supertest');
var request = supertest.agent(app.listen());

// 页面测试
describe('/demo_page/inner_demo_page是否200', function () {
    it('/demo_page/inner_demo_page', function (done) {
        request.get('/demo_page/inner_demo_page')
            .expect(200, done);
    });
});
