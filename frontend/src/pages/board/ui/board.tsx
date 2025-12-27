import { ROUTES } from "@/app/config";
import { boardApiService } from "@/entities";
import { Container } from "@/shared/ui";
import { reatomComponent } from "@reatom/react";
import { Link } from "react-router";

const boardRoute = boardApiService.getOneById;

export const Board = reatomComponent(() => {
    const board = boardRoute;

    return (
        <Container>
            <div>
                <Link to={ROUTES.boards}>Back</Link>
            </div>
            {board.loader.ready() ? board.loader.data()?.name : <p>Loading...</p>}
        </Container>
    );
});
