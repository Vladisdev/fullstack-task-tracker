import { randomUUID } from "crypto";
import {
	Board,
	GetBoardResponse,
	GetBoardResponseCard,
	GetBoardResponseColumn,
} from "../types/boards";
import { Maybe } from "../types/common";
import { createColumn } from "./columns-repository";
import { sqliteAll, sqliteRun } from "./db-connection";

type OneBoardDatabaseResult = {
	boardId: string;
	boardName: string;
	columnId?: Maybe<string>;
	columnName?: Maybe<string>;
	cardId?: Maybe<string>;
	cardText?: Maybe<string>;
};

export const createBoard = async (board: Board): Promise<void> => {
	await sqliteRun(
		`
            INSERT INTO boards(id, name)
            VALUES (?, ?)
        `,
		[board.id, board.name],
	);

	await createColumn({
		id: randomUUID(),
		name: "To Do",
		boardId: board.id,
	});
	await createColumn({
		id: randomUUID(),
		name: "In Progress",
		boardId: board.id,
	});
	await createColumn({
		id: randomUUID(),
		name: "Done",
		boardId: board.id,
	});
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

export const getBoard = async (
	id: string,
): Promise<GetBoardResponse | null> => {
	const board = await sqliteAll(
		`
         SELECT 
		 	boards.id as "boardId", 
			boards.name as "boardName",
		 	columns.id as "columnId", 
			columns.name as "columnName",
			cards.id as "cardId",
			cards.text as "cardText"
		 FROM boards
		 LEFT JOIN columns ON boards.id = columns.board_id
		 LEFT JOIN cards ON columns.id = cards.column_id
         WHERE boards.id = ?
        `,
		[id],
	);

	if (!isOneBoardDatabaseResult(board) || !board.length) return null;

	return mapOneBoardResult(board);
};

const mapOneBoardResult = (
	data: OneBoardDatabaseResult[],
): GetBoardResponse => {
	const columns: GetBoardResponseColumn[] = [];
	let column: GetBoardResponseColumn | undefined;

	for (const row of data) {
		if (!row.columnId) break;

		if (!column) {
			column = {
				id: row.columnId,
				name: row.columnName!,
				cards: [],
			};
		}

		if (column.id !== row.columnId) {
			columns.push(column);

			column = {
				id: row.columnId,
				name: row.columnName!,
				cards: [],
			};
		}

		if (!row.cardId) continue;

		column.cards.push({
			id: row.cardId,
			text: row.cardText!,
		} satisfies GetBoardResponseCard);
	}

	if (column) columns.push(column);

	return {
		id: data[0].boardId,
		name: data[0].boardName,
		columns,
	};
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

const isOneBoardDatabaseResult = (
	data: unknown,
): data is OneBoardDatabaseResult[] => {
	if (!Array.isArray(data)) {
		const message = "Data is not an array on getBoars";
		console.error(message, [data]);
		throw new Error(message);
	}

	const board = data as OneBoardDatabaseResult[];

	for (const row of board) {
		if (!row || !row.boardId || !row.boardName) return false;
	}

	return true;
};
