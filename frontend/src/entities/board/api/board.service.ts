import { ROUTES } from "@/app/config";
import { apiService } from "@/shared/api/apiService";
import { action, reatomRoute, withAsync } from "@reatom/core";
import type { Board, CreateBoardDTO, GetBoardResponse } from "../model/types";

const boardApiBasePath = "boards";

export const boardApiService = {
    getMany: reatomRoute(
        {
            path: ROUTES.boards.substring(1),
            async loader(): Promise<Board[]> {
                const response = await apiService(boardApiBasePath).get();
                const payload = await response.json();

                return payload;
            },
        },
        "getAllBoards",
    ),
    getOneById: reatomRoute(
        {
            path: `${ROUTES.boards.substring(1)}/:id`,
            async loader({ id }): Promise<GetBoardResponse> {
                const response = await apiService(`${boardApiBasePath}/${id}`).get();
                const payload = await response.json();

                return payload;
            },
        },
        "getOneBoard",
    ),
    create: action(async (body: CreateBoardDTO) => {
        const response = await apiService(boardApiBasePath).post<Board, CreateBoardDTO>(
            body,
        );
        return response;
    }, "createBoardAction").extend(withAsync()),
};
