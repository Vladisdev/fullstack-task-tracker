import express from "express";
import { PORT } from "./config";
import { createTables } from "./database/create-tables";
import { logger } from "./middleware/logger";
import { boardsRouter } from "./routers/boards.router";
import { cardsRouter } from "./routers/cards.router";
import { columnsRouter } from "./routers/columns.router";

const run = async () => {
	await createTables();

	const server = express();
	server.use(express.json());
	server.use(logger);

	server.get("/", (req, res) => res.send("Ok"));

	// TODO: Auto-create some columns on POST /boards

	server.use("/boards", boardsRouter);
	server.use("/boards/:boardId/columns", columnsRouter);
	server.use("/boards/:boardId/columns/:columnId/cards", cardsRouter);

	server.listen(PORT, () => {
		console.log(`Server started at ${PORT} port`);
	});
};

run().catch((err) => console.error(err));
