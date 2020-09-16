import {resBody} from '../src/interfaces/response';

let store: resBody[] = [];

export const initStore = (): void => {
	store = [
		{
			id: 1,
			name: 'Max',
			age: 22,
			work: 'mail.ru',
			address: 'home',
		},
	];
};

export const clearStore = (): void => {
	store = [];
};

export const updateStore = (newStore: resBody[]): void => {
	store = newStore;
};

export const getStore = (): resBody[] => store;
