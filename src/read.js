import express from "express";
import serverless from "serverless-http";
import { getDrizzleClient } from "./db/client.js";
import { countersTable } from "./db/schemas.js";
import { eq } from "drizzle-orm";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/counters", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	const result = await drizzleClient.select().from(countersTable);
	res.send(result);
});

app.get("/counters/:id", async (req, res) => {
	const drizzleClient = getDrizzleClient();
	const result = await drizzleClient
		.select()
		.from(countersTable)
		.where(eq(countersTable.id, req.params.id));
	res.send(result);
});

app.use((req, res) => {
	res.status(404).json({
		error: "Not Found - Read",
	});
});

export const handler = serverless(app);
