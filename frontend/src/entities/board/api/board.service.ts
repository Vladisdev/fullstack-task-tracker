import { apiService } from "@/shared/api/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Board, CreateBoardDTO, GetBoardResponse } from "../model/types";

const BOARD_API_BASE_PATH = "boards";
const QUERY_KEY = "boards";

export const boardService = {
    useGetBoards: () =>
        useQuery<Board[]>({
            queryKey: [QUERY_KEY],
            queryFn: () => apiService(BOARD_API_BASE_PATH).get(),
        }),

    useGetBoardById: (id: string) =>
        useQuery<GetBoardResponse>({
            queryKey: [QUERY_KEY, id],
            queryFn: () => apiService(`${BOARD_API_BASE_PATH}/${id}`).get(),
        }),

    useCreateBoard: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (body: CreateBoardDTO) =>
                apiService(BOARD_API_BASE_PATH).post(body),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            },
        });
    },
};
