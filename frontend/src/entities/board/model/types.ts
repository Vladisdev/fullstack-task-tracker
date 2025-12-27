export type Board = {
    id: string;
    name: string;
};

export type GetBoardResponse = {
    id: string;
    name: string;
    columns: Column[];
};

export type CreateBoardDTO = {
    name: string;
};

type Column = {
    id: string;
    name: string;
    cards: Card[];
};

type Card = {
    id: string;
    text: string;
};
