import { boardApiService, type CreateBoardDTO } from "@/entities";
import type { FormEvent } from "react";

export const createNewBoard = async (e: FormEvent<HTMLFormElement>) => {
    // ! refetch boards on success

    e.preventDefault();

    const body = Object.fromEntries(
        new FormData(e.target as HTMLFormElement),
    ) as CreateBoardDTO;

    await boardApiService.create(body);
};
