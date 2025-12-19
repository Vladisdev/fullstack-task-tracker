import { Column, GetColumnsResponse } from "../types/columns";
import { sqliteAll, sqliteGet, sqliteRun } from "./db-connection";

export const createColumn = async (column: Column): Promise<void> => {
	await sqliteRun(
		`
            INSERT INTO columns(id, name, board_id)
            VALUES (?, ?, ?)
        `,
		[column.id, column.name, column.boardId],
	);
};

export const updateColumn = async (column: Column): Promise<void> => {
	await sqliteRun(
		`
            UPDATE columns SET name = ?
            WHERE id = ? AND board_id = ?
        `,
		[column.name, column.id, column.boardId],
	);
};

export const deleteColumn = async (
	id: string,
	boardId: string,
): Promise<void> => {
	await sqliteRun(
		`
            DELETE FROM columns
            WHERE id = ? AND board_id = ?
        `,
		[id, boardId],
	);
};

export const getColumn = async (
	id: string,
	boardId: string,
): Promise<Column | null> => {
	const data = await sqliteGet(
		`
         SELECT id, name, board_id AS "boardId" FROM columns
         WHERE id = ? AND board_id = ?
   
        `,
		[id, boardId],
	);

	if (!isColumn(data)) return null;

	return data;
};

export const getColumns = async (
	boardId: string,
): Promise<GetColumnsResponse> => {
	const data = await sqliteAll(
		`
		SELECT id, name, board_id AS "boardId" FROM columns
		WHERE board_id = ?
		`,
		[boardId],
	);

	if (!Array.isArray(data)) {
		const message = "Data is not an array on getColumns";
		console.error(message, [data]);
		throw new Error(message);
	}

	return data
		.map((column) => {
			if (!isColumn(column)) return undefined;

			return column;
		})
		.filter((column) => column !== undefined);
};

const isColumn = (data: unknown): data is Column => {
	const column = data as Column;
	return !!(column && typeof column === "object" && column.id && column.name);
};
