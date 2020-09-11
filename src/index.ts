import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({message: 'health check'});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
