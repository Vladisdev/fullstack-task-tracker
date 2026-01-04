import type { Card } from "@/entities";
import styles from "./cardsList.module.css";

type CardsListProps = {
    cards: Card[];
};

export const CardsList = ({ cards }: CardsListProps) => {
    return (
        <ul className={styles.list}>
            {cards.map((card) => (
                <li key={card.id}>{card.text}</li>
            ))}
        </ul>
    );
};
