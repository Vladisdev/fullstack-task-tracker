import { Card } from "../types/cards";
import { CardIdParams, ColumnIdParams } from "../types/common";
import { sqliteAll, sqliteGet, sqliteRun } from "./db-connection";

export const createCard = async (card: Card): Promise<void> => {
	await sqliteRun(
		`
            INSERT INTO cards(id, text, column_id)
            VALUES (?, ?, ?)
        `,
		[card.id, card.text, card.columnId],
	);
};

export const updateCard = async (card: Card): Promise<void> => {
	await sqliteRun(
		`
            UPDATE cards SET text = ?, column_id = ?
            WHERE id = ?
        `,
		[card.text, card.columnId, card.id],
	);
};

export const deleteCard = async (id: string): Promise<void> => {
	await sqliteRun(
		`
            DELETE FROM cards
            WHERE id = ? 
        `,
		[id],
	);
};

export const getCard = async ({
	cardId,
	boardId,
	columnId,
}: CardIdParams): Promise<Card | null> => {
	const data = await sqliteGet(
		`
         SELECT cards.id, cards.text, cards.column_id as "columnId", columns.board_id as "boardId" 
		 FROM cards LEFT JOIN columns
		 ON cards.column_id = columns.id
		 WHERE cards.id = ? AND columns.id = ? AND columns.board_id = ?
        `,
		[cardId, columnId, boardId],
	);

	if (!isCard(data)) return null;

	return data;
};

export const getCards = async ({
	boardId,
	columnId,
}: ColumnIdParams): Promise<Card[]> => {
	const data = await sqliteAll(
		`
		SELECT cards.id, cards.text, cards.column_id as "columnId", columns.board_id as "boardId"
		FROM cards LEFT JOIN columns
		ON cards.column_id = columns.id
		WHERE columns.id = ? AND columns.board_id = ?
		`,
		[columnId, boardId],
	);

	if (!Array.isArray(data)) {
		const message = "Data is not an array on getCards";
		console.error(message, [data]);
		throw new Error(message);
	}

	return data
		.map((card) => {
			if (!isCard(card)) return undefined;

			return card;
		})
		.filter((card) => card !== undefined);
};

const isCard = (data: unknown): data is Card => {
	const card = data as Card;
	return !!(card && typeof card === "object" && card.id && card.text);
};
