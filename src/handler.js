// Import necessary modules
import express from "express";
import serverless from "serverless-http";
import { getDrizzleClient } from "./db/client.js";
import { countersTable } from "./db/schemas.js";

// Initialize the Express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic endpoint example
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/test", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	const result = await drizzleClient.select().from(countersTable);
	res.send(result);
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		error: "Not Found",
	});
});

// Export the handler for serverless
export const handler = serverless(app);
