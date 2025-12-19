export type BoardIdParam = {
	boardId: string;
};

export type ColumnIdParams = BoardIdParam & {
	columnId: string;
};

export type CardIdParams = ColumnIdParams & {
	cardId: string;
};
