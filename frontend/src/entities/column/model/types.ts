import type { Card } from "@/entities";

export type Column = {
    id: string;
    name: string;
    cards: Card[];
};
