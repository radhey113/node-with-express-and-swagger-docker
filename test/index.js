process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var mocha = require('mocha')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./');
let should = chai.should();

chai.use(chaiHttp);

describe('Test', () => {
    beforeEach((done) => {
        // Book.remove({}, (err) => { 
           done();         
        // });     
    });
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
//   describe('/POST book', () => {
//       it('it should not POST a book without pages field', (done) => {
//         let book = {
//             title: "The Lord of the Rings",
//             author: "J.R.R. Tolkien",
//             year: 1954
//         }
//         chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('errors');
//                 res.body.errors.should.have.property('pages');
//                 res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });

//   });
});