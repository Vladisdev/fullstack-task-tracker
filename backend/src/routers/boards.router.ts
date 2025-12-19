import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import {
	createBoard,
	deleteBoard,
	getBoard,
	getBoards,
	updateBoard,
} from "../database/boards-repository";
import {
	Board,
	CreateBoardRequest,
	GetBoardResponse,
	GetBoardsResponse,
} from "../types/boards";
import { BoardIdParam } from "../types/common";
import { validateBoardInput } from "./validation";

export const boardsRouter = express.Router();

boardsRouter.get(
	"/",
	async (req: Request, res: Response<GetBoardsResponse>) => {
		const boards = await getBoards();

		res.status(200).send(boards);
	},
);

boardsRouter.get(
	"/:boardId",
	async (
		req: Request<BoardIdParam>,
		res: Response<GetBoardResponse | string>,
	) => {
		const board = await getBoard(req.params.boardId);

		if (!board) {
			return res
				.status(404)
				.send(`There is no board with id ${req.params.boardId}`);
		}

		res.status(200).send(board);
	},
);

boardsRouter.post(
	"/",
	validateBoardInput,
	async (
		req: Request<{}, Board, CreateBoardRequest>,
		res: Response<Board>,
	) => {
		const board: Board = {
			id: randomUUID(),
			name: req.body.name,
		};

		await createBoard(board);

		res.status(201).send(board);
	},
);

boardsRouter.put(
	"/:boardId",
	validateBoardInput,
	async (
		req: Request<BoardIdParam, Board, CreateBoardRequest>,
		res: Response<Board>,
	) => {
		const board: Board = {
			id: req.params.boardId,
			name: req.body.name,
		};

		await updateBoard(board);
		res.sendStatus(204);
	},
);

boardsRouter.delete(
	"/:boardId",
	async (req: Request<BoardIdParam>, res: Response<void>) => {
		await deleteBoard(req.params.boardId);
		res.sendStatus(205);
	},
);
