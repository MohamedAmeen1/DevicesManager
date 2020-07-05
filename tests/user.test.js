const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
chai.use(chaiHttp);
const should = chai.should();
const app = require('../app');
const request = require('supertest');

describe('test for user', function() {
    this.timeout(50000); 
  
    it('should add new user and get response ok to be true',function() {
      var formData = 
          {
            "email": "mohamedameen191@gmail.com",
            "name": "ameen",
            "password": "123456789",
            "phone": "201155939032"
          }
         return request(app)
         .post('/user/')
         .send(formData)
         .set('Accept', 'application/json')
         .expect('Content-Type', 'application/json; charset=utf-8')
         .expect(200)
         .then(function(res) {
             expect(res).to.be.json;
         })
    });
    it('should call signin and get response to be json',function() {
        var formData = 
            {
              "email": "mohamedameen191@gmail.com",
              "password": "123456789",
            }
           return request(app)
           .post('/user/signin')
           .send(formData)
           .set('Accept', 'application/json')
           .expect('Content-Type', 'application/json; charset=utf-8')
           .then(function(res) {
               expect(res).to.be.json;
           })
      });

});
