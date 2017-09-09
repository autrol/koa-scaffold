import chai from 'chai';
import supertest from 'supertest';
import app from '../server';
import {square, cube} from '../app/views/demo_page/as_require';

const expect = chai.expect;
const request = supertest.agent(app.listen());

// 页面路由测试
describe('/demo_page是否200', function () {
    it('/demo_page', function (done) {
        request.get('/demo_page')
            .expect(200, done);
    });
});

// 页面功能测试
describe('square方法', function () {
    it('输入数字2，接口是否是4', function () {
        expect(square(2)).to.be.equal(4);
    });
});

// 页面功能测试
describe('cube方法', function () {
    it('输入数字2，接口是否是8', function () {
        expect(cube(2)).to.be.equal(8);
    });
});