import {pool} from '../config';
import {resBody} from '../interfaces/response';
import {reqBody} from '../interfaces/request';

interface updateResult {
	updatedPerson: resBody;
	updatedRows: number;
}

const getAllPersons = async (): Promise<resBody[]> => {
	return (await pool.query<resBody>('SELECT * FROM persons')).rows;
};

const getOnePerson = async (id: number): Promise<resBody> => {
	return (await pool.query<resBody>(`SELECT * FROM persons WHERE id=${id}`))
		.rows[0];
};

const createOnePerson = async (payload: reqBody): Promise<resBody> => {
	const {name, age, address, work} = payload;
	return (
		await pool.query(
			`INSERT INTO persons (name, age, address, work) VALUES ('${name}', ${age}, '${address}','${work}') RETURNING *`,
		)
	).rows[0];
};

const updateOnePerson = async (
	payload: reqBody,
	id: number,
): Promise<updateResult> => {
	const {name, age, address, work} = payload;

	const {rows, rowCount} = await pool.query<resBody>(
		`UPDATE persons SET name = '${name}', age = ${age}, address = '${address}', work = '${work}' WHERE id=${id} RETURNING *`,
	);

	return {
		updatedPerson: rows[0],
		updatedRows: rowCount,
	};
};

const deleteOnePerson = async (id: number): Promise<number> => {
	return (await pool.query(`DELETE FROM persons WHERE id=${id}`)).rowCount;
};

export default {
	getAllPersons,
	getOnePerson,
	createOnePerson,
	updateOnePerson,
	deleteOnePerson,
};
