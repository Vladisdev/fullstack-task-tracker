import { useBoolean } from "@/shared/lib/useBoolean";
import { Modal } from "@/shared/ui";
import type { Card as CardType } from "../model/types";
import styles from "./card.module.css";

interface CardProps {
    card: CardType;
}

export const Card = ({ card }: CardProps) => {
    const [isOpened, openModal, closeModal] = useBoolean(false);

    return (
        <>
            <button className={styles.card} onClick={openModal}>
                {card.text}
            </button>
            {isOpened && (
                <Modal close={closeModal} title={card.text}>
                    <p>{card.text}</p>
                    <p>{new Date(card.createdAt).toLocaleDateString("ru-RU")}</p>
                </Modal>
            )}
        </>
    );
};
