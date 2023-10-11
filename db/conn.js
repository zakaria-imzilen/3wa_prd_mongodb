import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/";

export const client = new MongoClient(url);

const connecting = async () => {
	try {
		await client.connect();
	} catch (error) {
		return error;
	}
};

export default connecting;
