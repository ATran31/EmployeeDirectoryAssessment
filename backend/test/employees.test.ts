import { expect } from 'chai';
import { it, describe } from 'mocha'
import { agent as request } from 'supertest';


import Application from '../src/app';
const app = new Application()


describe('#employees', () => {

    it('Should return success', async () => {
        const res = await request(app.service).get('/v1/employees').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(5)
        expect(res.body[0].id).to.equal('82837')
        expect(res.body.error).to.be.undefined;
    })
})