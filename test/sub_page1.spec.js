var app = require('../server');
var supertest = require('supertest');
var request = supertest.agent(app.listen());

// 页面测试
describe('/page1/sub_page1是否200', function () {
    it('/page1/sub_page1', function (done) {
        request.get('/page1/sub_page1')
            .expect(200, done);
    });
});
