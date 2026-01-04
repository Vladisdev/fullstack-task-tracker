import type { Column as ColumnType } from "../model/types";
import styles from "./column.module.css";

type ColumnProps = {
    column: ColumnType;
};

export const Column = ({ column }: ColumnProps) => {
    return (
        <li className={styles.column}>
            <h2 className={styles.title}>{column.name}</h2>
            <ul>
                {column.cards.map((card) => (
                    <li key={card.id} className={styles.card}>
                        {card.text}
                    </li>
                ))}
            </ul>
        </li>
    );
};
