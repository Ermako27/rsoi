import {resBody} from '../../interfaces/response';
import {reqBody} from '../../interfaces/request';

import {updateStore, getStore} from '../../../test/utils';

/**
 * не будем ходить по сети в базу в unit-тестах, поэтому мокаем модель
 */

interface updateResult {
	updatedPerson: resBody | undefined;
	updatedRows: number;
}

const getAllPersons = async (): Promise<resBody[]> => {
	return getStore();
};

const getOnePerson = async (id: number): Promise<resBody> => {
	const store = getStore();
	return store.filter((person) => person.id === Number(id))[0];
};

const createOnePerson = async (payload: reqBody): Promise<resBody> => {
	const store = getStore();
	const newPerson = {id: store[store.length - 1].id + 1, ...payload};
	store.push(newPerson);

	updateStore(store);

	return newPerson;
};

const updateOnePerson = async (
	payload: reqBody,
	id: number,
): Promise<updateResult> => {
	const store = getStore();
	const personIndexInStore = store.findIndex(
		(person) => person.id === Number(id),
	);
	if (personIndexInStore !== -1) {
		store[personIndexInStore] = {id, ...payload};
		updateStore(store);
		return {
			updatedPerson: store[personIndexInStore],
			updatedRows: 1,
		};
	} else {
		return {
			updatedPerson: undefined,
			updatedRows: 0,
		};
	}
};

const deleteOnePerson = async (id: number): Promise<number> => {
	let store = getStore();
	const personIndexInStore = store.findIndex(
		(person) => person.id === Number(id),
	);

	if (personIndexInStore !== -1) {
		store = store.filter((person) => person.id === Number(id));
		updateStore(store);
		return 1;
	} else {
		return 0;
	}
};

export default {
	getAllPersons,
	getOnePerson,
	createOnePerson,
	updateOnePerson,
	deleteOnePerson,
};
