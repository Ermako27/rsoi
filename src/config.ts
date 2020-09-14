import {Pool, PoolConfig} from 'pg';

const herokuConfig: PoolConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};

export const pool = new Pool(herokuConfig);
