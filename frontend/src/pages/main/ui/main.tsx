import { BrandTitle, Button, Container } from "@/shared/ui";
import { useNavigate } from "react-router";
import styles from "./main.module.css";

export const Main = () => {
    const navigate = useNavigate();

    const goToBoards = () => navigate("/boards");

    return (
        <main className={styles.main}>
            <Container size="l" className={styles.container}>
                <BrandTitle />
                <p className={styles.subtitle}>Tool for track your tasks</p>
                <Button onClick={goToBoards}>Let`s get started</Button>
            </Container>
        </main>
    );
};
