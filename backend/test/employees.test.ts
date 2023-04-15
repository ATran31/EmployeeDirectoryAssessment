import { expect } from 'chai';
import { it, describe } from 'mocha';
import { agent as request } from 'supertest';

import Application from '../src/app';
const app = new Application();

describe('#employees', () => {
	it('Should return success', async () => {
		const res = await request(app.service).get('/v1/employees').send();
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.empty;
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.equal(5); // Discuss the merit of testing things like this here. Does my function work vs is my data correct are very separate concerns.
		expect(res.body[0].id).to.be.a('number');
		expect(res.body[0].id).to.equal(82837);
		expect(res.body.error).to.be.undefined;
	});
	it('Invalid dept returns 404', async () => {
		const res = await request(app.service)
			.get('/v1/employees/wrong')
			.send();
		expect(res.status).to.equal(404);
		expect(res.body).to.be.empty;
	});
	it('Valid dept returns one record', async () => {
		const res = await request(app.service)
			.get('/v1/employees/81832')
			.send();
		expect(res.status).to.equal(200);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an('object');
		expect(res.body).to.have.property('id');
		expect(res.body.id).to.be.a('number');
		expect(res.body).to.have.property('name');
		expect(res.body.name).to.be.a('string');
		expect(res.body).to.have.property('birthday');
		expect(res.body.birthday).to.be.a('string');
		expect(res.body).to.have.property('bio');
		expect(res.body.bio).to.be.a('string');
		expect(res.body).to.have.property('departmentId');
		expect(res.body.departmentId).to.be.a('number');
	});
});
