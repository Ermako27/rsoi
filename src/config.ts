import {Pool, PoolConfig} from 'pg';

const herokuConfig: PoolConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
export const pool = new Pool(herokuConfig);
