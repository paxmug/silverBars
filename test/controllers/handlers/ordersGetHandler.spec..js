const fs = require('fs');
const request = require('supertest');
const mockery = require('mockery');

const serviceMock = {
    getData : (key) => {
        switch(key){
            case 'board':
                return  [
                    {'userId':1,'quantity':3.5,'pricePerKg':306,'type':'SELL'},
                    {'userId':2,'quantity':1.2,'pricePerKg':310,'type':'SELL'},
                    {'userId':3,'quantity':3,'pricePerKg':304,'type':'BUY'},
                    {'userId':4,'quantity':1.5,'pricePerKg':307,'type':'SELL'},
                    {'userId':5,'quantity':1.8,'pricePerKg':309,'type':'BUY'},
                    {'userId':6,'quantity':2,'pricePerKg':306,'type':'SELL'},
                    {'userId':6,'quantity':6,'pricePerKg':304,'type':'BUY'},
                ];
            case 'currency': 
                return 'GBP';
            case 'metric': 
                return 'Kg';
        }

    }
};

describe('GET /api/orders', () => {
    let app;
    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: true,
            warnOnUnregistered: false,
        });
        mockery.registerMock('../../service/dataService', serviceMock);
        app = require('../../../app');
    });
    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });
    describe('Invalid request', () => {
        it('returns 415 if no content-type header', () => {
            return request(app)
                .get('/api/orders')
                .expect(415)
        })
        it('returns 415 if content-type header other than application/json', () => {
            return request(app)
                .post('/api/orders')
                .set('Content-Type', 'text/html')
                .expect(415)
        })
        it('returns 404 if non existing http method is called', () => {
            return request(app)
                .put('/api/orders')
                .set('Content-Type', 'application/json')
                .expect(404)
        })
    });
    describe('Valid request', () => {
        it('returns correct data', () => {
                return request(app)
                    .get('/api/orders')
                    .send()
                    .set('Content-Type', 'application/json')
                    .expect(200, {
                        currency: 'GBP',
                        metric: 'Kg',
                        board: [
                            {pricePerKg: 306, quantity: 5.5, type: 'SELL' },
                            {pricePerKg: 307, quantity: 1.5, type: 'SELL' },
                            {pricePerKg: 310, quantity: 1.2, type: 'SELL' },
                            {pricePerKg: 309, quantity: 1.8, type: 'BUY' },
                            {pricePerKg: 304, quantity: 9, type: 'BUY' }
                        ]
                    })
        })
    })
})
