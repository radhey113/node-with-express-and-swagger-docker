process.env.NODE_ENV = 'test';

let mongoose    = require("mongoose");
var mocha       = require('mocha')

let chai        = require('chai');
let chaiHttp    = require('chai-http');
let server      = require('../server.js');
let should      = chai.should();

chai.use(chaiHttp);

describe('Test', () => {

  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        
        /** We can also place server.js file here rather than only link **/ 
        chai.request('http://localhost:4000')
            .get('/getUser')
            .end((err, res) => {
                
                res.should.have.status(200);
                res.body.should.be.eql('cool');
                res.body.length.should.be.eql(4);
              done();
            });
      });
  });
});