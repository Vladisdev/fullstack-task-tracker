import type { Column } from "@/entities";

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
