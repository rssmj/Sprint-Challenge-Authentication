const request = require('supertest');
const server = require('../api/server');

describe('jokes-router.js', () => {
	describe('GET /', () => {
		it('shold return successful GET', () => {
			const creds = {
				username: Math.random(),
				password: 'testpass123',
			};
			return request(server).post('/api/auth/register').send(creds);
		});

		it(`should return 400 bad request: 'The way is shut. Please login first.'`, () => {
			return request(server)
				.get('/api/jokes')
				.then((res) => {
					expect(res.status).toBe(400);
				});
		});
	});
});
