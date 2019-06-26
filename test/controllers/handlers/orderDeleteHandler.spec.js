const request = require('supertest');
const mockery = require('mockery');

const serviceMock = {
    setData : () => {}
};

describe('DELETE /api/order', () => {
    let app;
    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: true,
            warnOnUnregistered: false,
        });
        mockery.registerMock('../../../service/dataService', serviceMock);
        app = require('../../../app');
    });
    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });


    describe('Invalid request', () => {
        it('returns 415 if no content-type header', () => {
            return request(app)
                .delete('/api/order')
                .expect(415)
        })
        it('returns 415 if content-type header other than application/json', () => {
            return request(app)
                .delete('/api/order')
                .set('Content-Type', 'text/html')
                .expect(415)
        })
        it('returns 400 if parameters are  missing', () => {
            return request(app)
                .delete('/api/order')
                .set('Content-Type', 'application/json')
                .expect(400)
        })
        it('returns 404 if non existing http method is called', () => {
            return request(app)
                .get('/api/order')
                .set('Content-Type', 'application/json')
                .expect(404)
        })
    });

    describe('Valid request', () => {
        it('returns correct data', () => {
            return request(app)
                .delete('/api/order')
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
