import { Button, Input } from "@/shared/ui";
import { type ComponentPropsWithRef } from "react";
import { createNewBoard } from "../api/createBoard";
import styles from "./createBoardFrom.module.css";

type CreateBoardFromProps = {} & ComponentPropsWithRef<"form">;

export const CreateBoardFrom = ({ ...props }: CreateBoardFromProps) => {
    return (
        <form onSubmit={createNewBoard} className={styles.form} {...props}>
            <Input placeholder="Board name" name="name" />
            <Button>{"Create"}</Button>
        </form>
    );
};
