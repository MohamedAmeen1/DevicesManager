const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
chai.use(chaiHttp);
const should = chai.should();
const app = require('../app');
const request = require('supertest');
require('dotenv').config()
const token=process.env.testToken
describe('test for device', function() {
    this.timeout(50000); 
    it('should add new device and get response ok to be true',function() {
      let formData = 
          {
                "model": "1",
                "name": "device1",
                "description": "holaaaa"
          }
         return request(app)
         .post('/device/')
         .send(formData)
         .set('Accept', 'application/json')
         .set('authToken', token)
         .expect('Content-Type', 'application/json; charset=utf-8')
         .expect(200)
         .then(function(res) {
             expect(res).to.be.json;
         })
    });
    it('should get devices and get response ok to be true',function() {
           return request(app)
           .get('/device/getdevices')
           .set('Accept', 'application/json')
           .set('authToken', token)
           .expect('Content-Type', 'application/json; charset=utf-8')
           .expect(200)
           .then(function(res) {
               expect(res).to.be.json;
           })
      });

});
