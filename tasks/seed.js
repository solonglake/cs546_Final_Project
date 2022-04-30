const dbConnection = require('../config/mongoConnection');

const main = async () => {
	const db = await dbConnection.connectToDb();
	await db.dropDatabase();
	console.log('Done seeding database');
	await dbConnection.closeConnection();
};

main().catch(console.log);