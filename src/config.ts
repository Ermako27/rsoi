import {Pool} from 'pg';

export const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'persons',
	port: 5432,
});
