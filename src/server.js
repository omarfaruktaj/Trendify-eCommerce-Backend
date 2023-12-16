const http = require('http');

const app = require('./app/app');
const connectDatabase = require('./config/connectDB');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = () => {
	server.listen(port, () => {
		console.info(`💪 Check health at: http://localhost:${port}/health`);
		console.log(`⚙️ Server is running on port: ${port}`);
	});
};

(async () => {
	try {
		await connectDatabase();
		startServer();
	} catch (error) {
		console.log('Database connection error:', error);
		process.exit(1)
	}
})();
