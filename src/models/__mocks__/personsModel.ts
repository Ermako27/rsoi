import {resBody} from '../../interfaces/response';
import {reqBody} from '../../interfaces/request';

let store: resBody[] = [
	{
		id: 1,
		name: 'Max',
		age: 22,
		work: 'mail.ru',
		address: 'home',
	},
];

interface updateResult {
	updatedPerson: resBody | undefined;
	updatedRows: number;
}

const getAllPersons = async (): Promise<resBody[]> => {
	return store;
	// return (await pool.query<resBody>('SELECT * FROM persons')).rows;
};

const getOnePerson = async (id: number): Promise<resBody> => {
	return store.filter((person) => person.id === id)[0];
	// return (await pool.query<resBody>(`SELECT * FROM persons WHERE id=${id}`))
	// 	.rows[0];
};

const createOnePerson = async (payload: reqBody): Promise<resBody> => {
	const newPerson = {id: store[store.length - 1].id + 1, ...payload};
	store.push(newPerson);

	return newPerson;
	// return (
	// 	await pool.query(
	// 		`INSERT INTO persons (name, age, address, work) VALUES ('${name}', ${age}, '${address}','${work}') RETURNING *`,
	// 	)
	// ).rows[0];
};

const updateOnePerson = async (
	payload: reqBody,
	id: number,
): Promise<updateResult> => {
	const personIndexInStore = store.findIndex((person) => person.id === id);
	if (personIndexInStore !== -1) {
		store[personIndexInStore] = {id, ...payload};
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

	// const {rows, rowCount} = await pool.query<resBody>(
	// 	`UPDATE persons SET name = '${name}', age = ${age}, address = '${address}', work = '${work}' WHERE id=${id} RETURNING *`,
	// );

	// return {
	// 	updatedPerson: rows[0],
	// 	updatedRows: rowCount,
	// };
};

const deleteOnePerson = async (id: number): Promise<number> => {
	const personIndexInStore = store.findIndex((person) => person.id === id);

	if (personIndexInStore !== -1) {
		store = store.filter((person) => person.id === id);
		return 1;
	} else {
		return 0;
	}
	// return (await pool.query(`DELETE FROM persons WHERE id=${id}`)).rowCount;
};

export default {
	getAllPersons,
	getOnePerson,
	createOnePerson,
	updateOnePerson,
	deleteOnePerson,
};
