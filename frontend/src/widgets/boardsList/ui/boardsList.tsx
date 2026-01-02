import { ROUTES } from "@/app/config";
import { useGetBoards, type Board } from "@/entities";
import { Link } from "react-router";
import styles from "./boardsList.module.css";

export const BoardsList = () => {
    const { data: boards, isLoading, isError, error } = useGetBoards();

    // ! TODO create spinner component
    if (isLoading) return <p>Loading...</p>;

    if (isError && error instanceof Error) {
        console.log(error?.message, error?.stack);

        return (
            // ? TODO Error page
            <p>
                Whoops... We have some problems here. Wait a little bit, we will fix it
                fast as it`s possible!
            </p>
        );
    }

    return (
        <ul className={styles.list}>
            {boards?.map((board) => (
                <BoardsListItem key={board.id} {...board} />
            ))}
        </ul>
    );
};

const BoardsListItem = (board: Board) => {
    return (
        <li className={styles.item}>
            <Link className={styles.link} to={`${ROUTES.boards}/${board.id}`}>
                {board.name}
            </Link>
        </li>
    );
};
