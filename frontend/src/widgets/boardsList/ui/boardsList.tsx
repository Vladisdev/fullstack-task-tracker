import { ROUTES } from "@/app/config";
import { boardApiService, type Board } from "@/entities";
import { reatomComponent } from "@reatom/react";
import { Link } from "react-router";
import styles from "./boardsList.module.css";

const {
    loader: { data: boards, ready, error },
} = boardApiService.getMany;

export const BoardsList = reatomComponent(() => {
    // ! TODO create spinner component
    if (!ready()) return <p>Loading...</p>;

    if (error()) {
        if (error() instanceof Error) console.log(error()?.message, error()?.stack);

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
            {boards()?.map((board) => (
                <BoardsListItem key={board.id} {...board} />
            ))}
        </ul>
    );
});

const BoardsListItem = (board: Board) => {
    return (
        <li className={styles.item}>
            <Link className={styles.link} to={`${ROUTES.boards}/${board.id}`}>
                {board.name}
            </Link>
        </li>
    );
};
