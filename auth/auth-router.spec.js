const request = require('supertest');
const server = require('../api/server');

describe('auth-router.js', function () {
	describe('POST /register', function () {
		it('should return status 201', async function () {
			let user = {
				username: Math.random(),
				password: 'testpass123',
			};
			const res = await request(server).post('/api/auth/register').send(user);
			expect(res.status).toBe(201);
		});
		it('should return status 500', async function () {
			const user = {
				username: 'user1',
				password: 'testpass123',
			};
			const res = await request(server).post('/api/auth/register').send(user);
			expect(res.status).toBe(500);
		});
	});

	describe('POST /login', function () {
		it('should return status 401', async function () {
			const user = {
				username: 'user1',
				password: 'testpass123',
			};
			const res = await request(server).post('/api/auth/login').send(user);
			expect(res.status).toBe(401);
		});
		it('should return status 500', async function () {
			const user = {
				username: 'user0',
				password: 'testpass123',
			};
			const res = await request(server).post('/api/auth/login').send(user);
			expect(res.status).toBe(500);
		});
	});
});
