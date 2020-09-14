import express, {Request, Response} from 'express';
import {
	getPerson,
	getPersons,
	createPerson,
	updatePerson,
	deletePerson,
} from './controllers/personsController';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		message: 'health check',
		'process.env.DATABASE_URL': process.env.DATABASE_URL,
	});
});

app.get('/persons/:id', getPerson);
app.get('/persons', getPersons);
app.post('/persons', createPerson);
app.patch('/persons/:id', updatePerson);
app.delete('/persons/:id', deletePerson);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
