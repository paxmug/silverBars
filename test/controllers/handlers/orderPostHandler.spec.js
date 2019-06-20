const request = require('supertest');

describe('POST /api/order', () => {
    let app;
    before(() => {
        app = require('../../../app');
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
})
