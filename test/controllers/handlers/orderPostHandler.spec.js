const request = require('supertest');
const { resetDataBase } = require('../../helper');
const orders = require('../../../db/orders');

describe('POST /api/order', () => {
    let app;
    before(() => {
        app = require('../../../app');
    });
    after(() => {
       resetDataBase();
    });


    describe('Invalid request', () => {
        it('returns 415 if no content-type header', () => {
            return request(app)
                .post('/api/order')
                .expect(415)
        })
        it('returns 415 if content-type header other than application/json', () => {
            return request(app)
                .post('/api/order')
                .set('Content-Type', 'text/html')
                .expect(415)
        })
        it('returns 400 if parameters are  missing', () => {
            return request(app)
                .post('/api/order')
                .set('Content-Type', 'application/json')
                .expect(400)
        })
        it('returns 404 if different http method is called', () => {
            return request(app)
                .get('/api/order')
                .set('Content-Type', 'application/json')
                .expect(404)
        })
    });

    describe('Valid request', () => {
        it('returns correct data', () => {
            return request(app)
                .post('/api/order')
                .send({
                    'userId': 1,
                    'quantity': 3.5,
                    'pricePerKg': 303,
                    'type': 'BUY'
                    })
                .set('Content-Type', 'application/json')
                .expect(200)          
        });
    })
})
