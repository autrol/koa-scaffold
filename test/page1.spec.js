import chai from 'chai';
import supertest from 'supertest';
import app from '../server';
import getType from '../app/views/page1/get_type';

const expect = chai.expect;
const request = supertest.agent(app.listen());

// 页面测试
describe('/page1是否200', function () {
    it('/page1', function (done) {
        request.get('/page1')
            .expect(200, done);
    });
});

describe('page1', function () {
    it('page1页面的代码覆盖率', function () {
        expect(getType(true)).to.be.equal('boolean');
    });
});
