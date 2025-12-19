import { Board } from "../types/boards";
import { sqliteAll, sqliteGet, sqliteRun } from "./db-connection";

export const createBoard = async (board: Board): Promise<void> => {
	await sqliteRun(
		`
            INSERT INTO boards(id, name)
            VALUES (?, ?)
        `,
		[board.id, board.name],
	);
};

export const updateBoard = async (board: Board): Promise<void> => {
	await sqliteRun(
		`
            UPDATE boards SET name = ?
            WHERE id = ?
        `,
		[board.name, board.id],
	);
};

export const deleteBoard = async (id: string): Promise<void> => {
	await sqliteRun(
		`
            DELETE FROM boards
            WHERE id = ?
        `,
		[id],
	);
};

export const getBoard = async (id: string): Promise<Board | null> => {
	const data = await sqliteGet(
		`
         SELECT * FROM boards
         WHERE id = ?   
        `,
		[id],
	);

	if (!isBoard(data)) return null;

	return data;
};

export const getBoards = async (): Promise<Board[]> => {
	const data = await sqliteAll(`SELECT * FROM boards`);

	if (!Array.isArray(data)) {
		const message = "Data is not an array on getBoards";
		console.error(message, [data]);
		throw new Error(message);
	}

	return data
		.map((board) => {
			if (!isBoard(board)) return undefined;

			return board;
		})
		.filter((board) => board !== undefined);
};

const isBoard = (data: unknown): data is Board => {
	const board = data as Board;
	return !!(board && typeof board === "object" && board.id && board.name);
};
