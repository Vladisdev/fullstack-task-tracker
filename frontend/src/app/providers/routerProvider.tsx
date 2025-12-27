import { BoardPage, BoardsPage, MainPage } from "@/pages";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ROUTES } from "../config";
import { Header } from "../ui";

const router = createBrowserRouter([
    {
        path: ROUTES.index,
        index: true,
        element: <MainPage />,
    },
    {
        path: ROUTES.index,
        element: (
            <>
                <Header />
                <Outlet />
            </>
        ),
        children: [
            {
                path: ROUTES.boards,
                element: <BoardsPage />,
            },
            {
                path: ROUTES.boards + "/:id",
                element: <BoardPage />,
            },
        ],
    },
]);

export const Router = () => <RouterProvider router={router} />;
