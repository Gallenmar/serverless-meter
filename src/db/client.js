// Import necessary modules
let createClient, drizzle;
if (process.env.STAGE === "dev") {
	const { createClient: devCreateClient } = await import("@libsql/client");
	const { drizzle: devDrizzle } = await import("drizzle-orm/libsql");
	createClient = devCreateClient;
	drizzle = devDrizzle;
} else {
	const { createClient: webCreateClient } = await import("@libsql/client/web");
	const { drizzle: webDrizzle } = await import("drizzle-orm/libsql/web");
	createClient = webCreateClient;
	drizzle = webDrizzle;
}

// Initialize the client
let tursoClient = null;

// Load environment variables

// Function to initialize the client using environment variables
const initializeClient = () => {
	const dbUrl = process.env.DB_URL;
	const dbKey = process.env.DB_KEY;

	if (!dbUrl) {
		throw new Error("Database URL is not configured");
	}

	tursoClient = createClient({
		url: dbUrl,
		authToken: dbKey,
	});

	return tursoClient;
};

// Function to get the database client
const getDbClient = () => {
	if (!tursoClient) {
		initializeClient();
	}
	return tursoClient;
};

// Function to get the drizzle client
const getDrizzleClient = () => {
	if (!tursoClient) {
		initializeClient();
	}
	return drizzle(tursoClient);
};

// Export the functions
export { getDbClient, getDrizzleClient };
