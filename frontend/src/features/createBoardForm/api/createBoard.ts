import type { CreateBoardDTO } from "@/entities";
import type { FormEvent } from "react";

export const submit = (
    e: FormEvent<HTMLFormElement>,
    callback: (body: CreateBoardDTO) => void,
) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (!formData.get("name")) return;

    const body = {
        name: formData.get("name") as string,
    } satisfies CreateBoardDTO;

    callback(body);
};
