import { ROUTES } from "@/app/config";
import { boardService } from "@/entities";
import { Container } from "@/shared/ui";
import { ColumnsList } from "@/widgets";
import { Link, useParams } from "react-router";
import styles from "./board.module.css";

export const Board = () => {
    const { id } = useParams<{ id: string }>();
    const { data: board, isError, error } = boardService.useGetBoardById(id ?? "");

    if (isError && error instanceof Error) {
        console.log(error?.message, error?.stack);

        return <p>Error: {error?.message}</p>;
    }

    return (
        <Container>
            <div className={styles.header}>
                <Link to={ROUTES.boards} className={styles.backLink}>
                    ← Back
                </Link>
            </div>
            <h1 className={styles.title}>{board?.name}</h1>
            {board?.columns ? <ColumnsList columns={board.columns} /> : "No columns"}
        </Container>
    );
};
