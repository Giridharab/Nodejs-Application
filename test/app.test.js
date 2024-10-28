// test/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Node.js Application API Tests', () => {
  
  describe('GET /api/status', () => {
    it('should return status OK', (done) => {
      chai.request(app)
        .get('/api/status')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'OK');
          done();
        });
    });
  });
  
  describe('POST /api/add', () => {
    it('should return the correct sum when valid numbers are provided', (done) => {
      chai.request(app)
        .post('/api/add')
        .send({ num1: 5, num2: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('result', 15);
          done();
        });
    });

    it('should return an error when invalid inputs are provided', (done) => {
      chai.request(app)
        .post('/api/add')
        .send({ num1: "five", num2: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Invalid input');
          done();
        });
    });
  });
});

