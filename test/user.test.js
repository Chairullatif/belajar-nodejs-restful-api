const supertest = require("supertest");
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from 'bcrypt';

describe("POST /api/users", () => {
	//setelah selesai testing data dihapus
	afterEach(async () => {
		await removeTestUser();
	});

	it("should can register new user", async () => {
		const result = await supertest(web).post("/api/users").send({
			username: "test",
			password: "rahasia",
			name: "Test",
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.name).toBe("Test");
		expect(result.body.data.password).toBeUndefined();
	});

	it("should reject if request is invalid", async () => {
		const result = await supertest(web).post("/api/users").send({
			username: "",
			password: "",
			name: "",
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("should reject if username has already registered", async () => {
		let result = await supertest(web).post("/api/users").send({
			username: "test",
			password: "rahasia",
			name: "Test",
		});

        logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.name).toBe("Test");
		expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post("/api/users").send({
			username: "test",
			password: "rahasia",
			name: "Test",
		});

        logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

});

describe('POST /api/users/login', () => { 
	beforeEach(async () => {
		await createTestUser();
	})
	
	afterEach(async () => {
		await removeTestUser();
	})

	it('should can login', async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "test", 
			password: "rahasia"
		})

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.data.token).not.toBe("test");
	})

	it('should reject login if request is invalid', async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "", 
			password: ""
		})

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	})

	it('should reject login if password is wrong', async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "test", 
			password: "salah"
		})

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	})

	it('should reject login if username is wrong', async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "salah", 
			password: "rahasia"
		})

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	})
})

describe('GET /api/users/current', () => { 
	beforeEach(async () => {
		await createTestUser();
	})
	
	afterEach(async () => {
		await removeTestUser();
	})

	it('should can get current user', async () => {
		const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('Test');
	})

	it('should reject current user if token is invalid', async () => {
		const result = await supertest(web).get('/api/users/current').set('Authorization', 'salah');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	})
})

describe('PATCH /api/users/current', () => { 
	beforeEach(async () => {
		await createTestUser();
	})
	
	afterEach(async () => {
		await removeTestUser();
	})

	it('should can update user', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				name: "Irul", 
				password: "rahasia2"
			})

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.name).toBe("Irul");

		const user = await getTestUser();
		logger.info(user);
		expect(await bcrypt.compare("rahasia2", user.password)).toBe(true);
	})

	it('should can update user name only', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				name: "Irul", 
			})

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.name).toBe("Irul");
	})

	
	it('should can update user password', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				password: "rahasia2"
			})

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("test");
		expect(result.body.data.name).toBe("Test");

		const user = await getTestUser();
		logger.info(user);
		expect(await bcrypt.compare("rahasia2", user.password)).toBe(true);
	})
	
	it('should reject if request is not valid', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'salah')
			.send({})

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	})
})

describe('DELETE /api/users/logout', () => { 
	beforeEach(async () => {
		await createTestUser();
	})
	
	afterEach(async () => {
		await removeTestUser();
	})

	it('should can loguot', async() => {
		const result = await supertest(web)
			.delete('/api/users/logout')
			.set('Authorization', 'test');

		logger.info(result)
		
		expect(result.status).toBe(200);
		expect(result.body.data).toBe("OK");

		const user = await getTestUser();
		expect(user.token).toBeNull();
	})

	it('should reject loguot if token is invalid', async() => {
		const result = await supertest(web)
			.delete('/api/users/logout')
			.set('Authorization', 'salah');

		logger.info(result)
		
		expect(result.status).toBe(401);
	})

})
