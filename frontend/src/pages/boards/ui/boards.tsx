import { Container } from "@/shared/ui";
import { BoardsList } from "@/widgets";
import styles from "./boards.module.css";

export const Boards = () => {
    return (
        <main className={styles.main}>
            <Container>
                <BoardsList />
            </Container>
        </main>
    );
};
