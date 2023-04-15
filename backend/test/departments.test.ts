import { expect } from 'chai';
import { it, describe } from 'mocha';
import { agent as request } from 'supertest';

import Application from '../src/app';
const app = new Application();

describe('#departments', () => {
	it('All depts return success', async () => {
		const res = await request(app.service).get('/v1/departments').send();
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.empty;
		expect(res.body).to.be.a('array');
		expect(res.body[0].id).to.be.a('number');
		expect(res.body.error).to.be.undefined;
	});
	it('Invalid dept returns 404', async () => {
		const res = await request(app.service)
			.get('/v1/departments/wrong')
			.send();
		expect(res.status).to.equal(404);
		expect(res.body).to.be.empty;
	});
	it('Valid dept returns one record', async () => {
		const res = await request(app.service).get('/v1/departments/2').send();
		expect(res.status).to.equal(200);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('id');
		expect(res.body.id).to.be.a('number');
		expect(res.body).to.have.property('name');
		expect(res.body.name).to.be.a('string');
		expect(res.body).to.have.property('employeeIds');
		expect(res.body.employeeIds).to.be.an('array');
	});
});
