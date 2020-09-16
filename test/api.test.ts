import request from 'supertest';
import {app} from '../src/app';

import {initStore, clearStore} from './utils';

jest.mock('../src/models/personsModel');

describe('api tests', () => {
	beforeEach(() => {
		initStore();
	});

	afterEach(() => {
		clearStore();
	});

	test('get all persons', async () => {
		const response = await request(app).get('/persons');
		expect(response.status).toBe(200);
	});

	test('get person by id', async () => {
		const response = await request(app).get('/persons/1');
		expect(response.status).toBe(200);
	});

	test('get person not found', async () => {
		const response = await request(app).get('/persons/99');
		expect(response.status).toBe(404);
	});

	test('create new person', async () => {
		const response = await request(app)
			.post('/persons')
			.send({name: 'Max', age: 30, address: 'Moscow', work: 'VRB'});
		expect(response.status).toBe(201);
	});

	test('delete person', async () => {
		const response = await request(app).delete('/persons/1');
		expect(response.status).toBe(200);
	});

	test('delete person not found', async () => {
		const response = await request(app).delete('/persons/99');
		expect(response.status).toBe(404);
	});

	test('update person', async () => {
		const response = await request(app)
			.patch('/persons/1')
			.send({name: 'Max', age: 30, address: 'Moscow', work: 'VRB'});
		expect(response.status).toBe(200);
	});

	test('update person not found', async () => {
		const response = await request(app)
			.patch('/persons/99')
			.send({name: 'Max', age: 30, address: 'Moscow', work: 'VRB'});
		expect(response.status).toBe(404);
	});
});
