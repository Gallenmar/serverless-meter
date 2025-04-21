import express from "express";
import serverless from "serverless-http";
import { getDrizzleClient } from "./db/client.js";
import { countersTable } from "./db/schemas.js";
import { eq } from "drizzle-orm";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.delete("/counters/:id", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	try {
		await drizzleClient
			.delete(countersTable)
			.where(eq(countersTable.id, req.params.id));
		res.status(204).send();
	} catch (error) {
		res.status(400).json({
			error: "Failed to delete counter",
			details: error.message,
		});
	}
});

app.use((req, res) => {
	res.status(404).json({
		error: "Not Found - Delete",
	});
});

export const handler = serverless(app);
