import express from "express";
import serverless from "serverless-http";
import { getDrizzleClient } from "./db/client.js";
import { countersTable } from "./db/schemas.js";
import { eq } from "drizzle-orm";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.patch("/counters/:id", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	try {
		const result = await drizzleClient
			.update(countersTable)
			.set(req.body)
			.where(eq(countersTable.id, req.params.id));
		res.json(result);
	} catch (error) {
		res.status(400).json({
			error: "Failed to update counter",
			details: error.message,
		});
	}
});

app.use((req, res) => {
	res.status(404).json({
		error: "Not Found - Update",
	});
});

export const handler = serverless(app);
