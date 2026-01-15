import cors from "cors";
import express from "express";
import { CORS_OPTIONS, PORT } from "./config";
import { createTables } from "./database/create-tables";
import { logger } from "./middleware/logger";
import { boardsRouter } from "./routers/boards.router";
import { cardsRouter } from "./routers/cards.router";
import { columnsRouter } from "./routers/columns.router";

const run = async () => {
	await createTables();

	const server = express();
	server.use(cors(CORS_OPTIONS));
	server.use(express.json());
	server.use(logger);

	server.get("/", (req, res) => res.send("Ok"));

	server.use("/boards", boardsRouter);
	server.use("/boards/:boardId/columns", columnsRouter);
	server.use("/boards/:boardId/columns/:columnId/cards", cardsRouter);

	server.listen(PORT, () => {
		console.log(`Server started at ${PORT} port`);
	});
};

run().catch((err) => console.error(err));
