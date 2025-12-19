import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import {
	createColumn,
	deleteColumn,
	getColumn,
	getColumns,
	updateColumn,
} from "../database/columns-repository";
import type {
	Column,
	CreateColumnRequest,
	GetColumnsResponse,
} from "../types/columns";
import { BoardIdParam, ColumnIdParams } from "../types/common";
import { validateColumnInput } from "./validation";

export const columnsRouter = express.Router({
	mergeParams: true,
});

columnsRouter.get(
	"/",
	async (req: Request<BoardIdParam>, res: Response<GetColumnsResponse>) => {
		const columns = await getColumns(req.params.boardId);

		res.status(200).send(columns);
	},
);

columnsRouter.get(
	"/:columnId",
	async (req: Request<ColumnIdParams>, res: Response<Column | string>) => {
		const column = await getColumn(req.params.columnId, req.params.boardId);

		if (!column) {
			res.status(404).send(
				`There is no column with id ${req.params.columnId}`,
			);
			return;
		}

		res.status(200).send(column);
	},
);

columnsRouter.post(
	"/",
	validateColumnInput,
	async (
		req: Request<ColumnIdParams, Column, CreateColumnRequest>,
		res: Response<Column>,
	) => {
		const board: Column = {
			id: randomUUID(),
			name: req.body.name,
			boardId: req.params.boardId,
		};

		await createColumn(board);

		res.status(201).send(board);
	},
);

columnsRouter.put(
	"/:columnId",
	validateColumnInput,
	async (
		req: Request<ColumnIdParams, Column, CreateColumnRequest>,
		res: Response<Column>,
	) => {
		const board: Column = {
			id: req.params.columnId,
			name: req.body.name,
			boardId: req.params.boardId,
		};

		await updateColumn(board);
		res.sendStatus(204);
	},
);

columnsRouter.delete(
	"/:columnId",
	async (req: Request<ColumnIdParams>, res: Response<void>) => {
		await deleteColumn(req.params.columnId, req.params.boardId);
		res.sendStatus(205);
	},
);
