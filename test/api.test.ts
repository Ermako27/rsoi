import request from 'supertest';
import {app} from '../src/app';

jest.mock('../src/models/personsModel');

describe('GET / ', () => {
	test('It should respond with an array of persons', async () => {
		const response = await request(app).get('/persons');
		expect(response.status).toBe(200);
	});
});
