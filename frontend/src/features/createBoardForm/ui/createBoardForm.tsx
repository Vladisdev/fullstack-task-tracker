import { useBoardService } from "@/entities";
import { Button, Input } from "@/shared/ui";
import { type ComponentPropsWithRef, type FormEvent } from "react";
import { submit } from "../api/createBoard";
import styles from "./createBoardForm.module.css";

type CreateBoardFormProps = {} & ComponentPropsWithRef<"form">;

export const CreateBoardForm = ({ ...props }: CreateBoardFormProps) => {
    const { mutate: createBoard, isPending } = useBoardService.useCreateBoard();

    return (
        <form
            onSubmit={(e) => submit(e as FormEvent<HTMLFormElement>, createBoard)}
            className={styles.form}
            {...props}
        >
            <Input placeholder="Board name" name="name" required />
            <Button type="submit" disabled={isPending}>
                Create
            </Button>
        </form>
    );
};
