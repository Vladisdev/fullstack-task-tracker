import { ROUTES } from "@/app/config";
import { useGetBoardById } from "@/entities";
import { Container } from "@/shared/ui";
import { Link, useParams } from "react-router";

export const Board = () => {
    const { id } = useParams<{ id: string }>();
    const { data: board, isLoading, isError, error } = useGetBoardById(id ?? "");

    if (isError && error instanceof Error) {
        console.log(error?.message, error?.stack);

        return <p>Error: {error?.message}</p>;
    }

    return (
        <Container>
            <div>
                <Link to={ROUTES.boards}>Back</Link>
            </div>
            {isLoading ? <p>Loading...</p> : board?.name}
        </Container>
    );
};
