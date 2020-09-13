import {Request, Response} from 'express';
import {reqParams, reqBody} from '../interfaces/request';
import {resBody, errorRes, errorValidationRes} from '../interfaces/response';

import {getAllPersons} from '../models/personsModel';

export const getPerson = async (
	req: Request<reqParams, any, reqBody>,
	res: Response<resBody>,
) => {};

export const getPersons = async (req: Request, res: Response) => {
	const result = await getAllPersons();
	console.log(result);

	res.status(200).json(result);
};

export const createPerson = async (req: Request, res: Response) => {};

export const updatePerson = async (req: Request, res: Response) => {};

export const deletePerson = async (req: Request, res: Response) => {};
