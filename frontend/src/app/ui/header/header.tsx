import { ROUTES } from "@/app/config";
import { CreateBoardForm } from "@/features";
import { BrandTitle, Button, Modal } from "@/shared/ui";
import { useRef } from "react";
import { Link } from "react-router";
import styles from "./header.module.css";

export const Header = () => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    return (
        <header className={styles.header}>
            <Link to={ROUTES.index}>
                <BrandTitle className={styles.title} />
            </Link>
            <Button onClick={() => dialogRef.current?.showModal()}>
                Create new board
            </Button>
            <Modal ref={dialogRef} title={"Create new board"}>
                <CreateBoardForm />
            </Modal>
        </header>
    );
};
