import chai from 'chai';
import supertest from 'supertest';
import app from '../server';

const expect = chai.expect;
const request = supertest.agent(app.listen());

// 页面测试
describe('/page2是否200', function () {
    it('/page2', function (done) {
        request.get('/page2')
            .expect(200, done);
    });
});
