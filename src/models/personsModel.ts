import {pool} from '../config';
import {resBody, errorRes, errorValidationRes} from '../interfaces/response';

export const getAllPersons = async (): Promise<resBody[]> => {
	return (await pool.query<resBody>('SELECT * FROM persons')).rows;
};
