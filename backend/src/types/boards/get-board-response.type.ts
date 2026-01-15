export type GetBoardResponseCard = {
	id: string;
	text: string;
	createdAt: string;
};

export type GetBoardResponseColumn = {
	id: string;
	name: string;
	cards: GetBoardResponseCard[];
};

export type GetBoardResponse = {
	id: string;
	name: string;
	columns: GetBoardResponseColumn[];
};
