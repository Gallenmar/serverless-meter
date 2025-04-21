import express from "express";
import serverless from "serverless-http";
import { getDrizzleClient } from "./db/client.js";
import { countersTable } from "./db/schemas.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/counters", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	try {
		const result = await drizzleClient.insert(countersTable).values(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({
			error: "Failed to create counter",
			details: error.message,
		});
	}
});

app.use((req, res) => {
	res.status(404).json({
		error: "Not Found - Create",
	});
});

export const handler = serverless(app);
