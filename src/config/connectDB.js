const mongoose = require('mongoose');

const mongoDBUri = process.env.DATABASE_URI;
const DBName = process.env.DB_NAME;

const connectDatabase = async () => {
	try {
		await mongoose.connect(`${mongoDBUri}/${DBName}`);
		console.log('\n✨ MongoDB connected!');
	} catch (error) {
		console.log('Database connection error: ', error);
		process.exit(1);
	}
};

module.exports = connectDatabase;
