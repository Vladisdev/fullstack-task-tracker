import { boardService } from "@/entities";
import { Button, Input } from "@/shared/ui";
import { type ComponentPropsWithRef, type FormEvent, type RefObject } from "react";
import { submit } from "../api/createBoard";
import styles from "./createBoardForm.module.css";

type CreateBoardFormProps = {
    inputRef?: RefObject<HTMLInputElement | null>;
} & ComponentPropsWithRef<"form">;

export const CreateBoardForm = ({ inputRef, ...props }: CreateBoardFormProps) => {
    const { mutate: createBoard, isPending } = boardService.useCreateBoard();

    return (
        <form
            onSubmit={(e) => submit(e as FormEvent<HTMLFormElement>, createBoard)}
            className={styles.form}
            {...props}
        >
            <Input placeholder="Board name" name="name" required ref={inputRef} />
            <Button type="submit" disabled={isPending}>
                Create
            </Button>
        </form>
    );
};
