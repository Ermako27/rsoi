import {Request, Response} from 'express';
import {reqParams, reqBody} from '../interfaces/request';
import {resBody, errorRes, errorValidationRes} from '../interfaces/response';

import {
	getAllPersons,
	getOnePerson,
	createOnePerson,
	updateOnePerson,
	deleteOnePerson,
} from '../models/personsModel';

export const getPerson = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<resBody | errorRes | errorValidationRes>,
): Promise<void> => {
	try {
		const {id} = req.params;

		if (!Number(id)) {
			res.status(400).json({
				message: 'bad request',
				errors: {
					error: 'invalid id, must be number',
				},
			});
			return;
		}

		const result = await getOnePerson(id);

		result
			? res.status(200).json(result)
			: res.status(404).json({message: 'not found'});
	} catch {
		res.status(500).json({message: 'internal server error'});
	}
};

export const getPersons = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<resBody[] | errorRes | errorValidationRes>,
): Promise<void> => {
	try {
		const result = await getAllPersons();

		res.status(200).json(result);
	} catch {
		res.status(500).json({message: 'internal server error'});
	}
};

export const createPerson = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<void | errorRes | errorValidationRes>,
): Promise<void> => {
	try {
		const {body} = req;

		await createOnePerson(body);

		res.status(200).json({message: 'person created'});
	} catch {
		res.status(500).json({message: 'internal server error'});
	}
};

export const updatePerson = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<resBody | errorRes | errorValidationRes>,
): Promise<void> => {
	try {
		const {body} = req;
		const {id} = req.params;
		const {updatedPerson, updatedRows} = await updateOnePerson(body, id);

		updatedRows
			? res.status(200).json(updatedPerson)
			: res.status(404).json({message: 'not found'});
	} catch {
		res.status(500).json({message: 'internal server error'});
	}
};

export const deletePerson = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<resBody | errorRes | errorValidationRes>,
): Promise<void> => {
	try {
		const {id} = req.params;
		const deletedRows = await deleteOnePerson(id);

		deletedRows
			? res.status(200).json()
			: res.status(404).json({message: 'not found'});
	} catch {
		res.status(500).json({message: 'internal server error'});
	}
};
