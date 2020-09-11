export interface resBody {
	id: number;
	name: string;
	age: number;
	address: string;
	work: string;
}

export interface errorRes {
	message: string;
}

export interface errorValidationRes {
	message: string;
	errors: {[key: string]: string};
}
