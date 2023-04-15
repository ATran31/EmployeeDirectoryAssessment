import { expect } from "chai";
import { it, describe } from "mocha";
import { agent as request } from "supertest";

import Application from "../src/app";
const app = new Application();

describe("#departments", () => {
	it("Should return success", async () => {
		const res = await request(app.service).get("/v1/departments").send();
		expect(res.status).to.equal(200);
		expect(res.body).not.to.be.empty;
		expect(res.body).to.be.a("array");
		expect(res.body.length).to.equal(3);
		expect(res.body[0].id).to.be.a("number");
		expect(res.body[0].id).to.equal(2);
		expect(res.body.error).to.be.undefined;
	});
});
