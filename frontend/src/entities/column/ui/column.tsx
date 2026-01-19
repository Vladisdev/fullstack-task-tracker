import { CardComponent } from "@/entities/card";
import { Input, Title } from "@/shared/ui";
import type { Column as ColumnType } from "../model/types";
import styles from "./column.module.css";

interface ColumnProps {
    column: ColumnType;
}

export const Column = ({ column }: ColumnProps) => {
    return (
        <li className={styles.column}>
            <Title element="h3" text={column.name} className={styles.title} />
            <ul>
                {column.cards.map((card) => (
                    <CardComponent key={card.id} card={card} />
                ))}
                <Input multiline placeholder="Add new task" />
            </ul>
        </li>
    );
};
