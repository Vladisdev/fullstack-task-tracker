import { Button, Input } from "@/shared/ui";
import { type ComponentPropsWithRef, type FormEvent } from "react";
// import { createForm } from "../model/formState";
import { useCreateBoard, type CreateBoardDTO } from "@/entities";
import styles from "./createBoardForm.module.css";

type CreateBoardFormProps = {} & ComponentPropsWithRef<"form">;

export const CreateBoardForm = ({ ...props }: CreateBoardFormProps) => {
    const { mutate: createBoard, isPending } = useCreateBoard();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const body = {
            name: formData.get("name") as string,
        } satisfies CreateBoardDTO;

        createBoard(body);
    };

    return (
        <form onSubmit={submit} className={styles.form} {...props}>
            <Input placeholder="Board name" name="name" autoComplete="name" />
            <Button type="submit" disabled={isPending}>
                Create
            </Button>
        </form>
    );
};
