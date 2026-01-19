import { ROUTES } from "@/app/config";
import { CreateBoardForm } from "@/features";
import { useBoolean } from "@/shared/lib";
import { BrandTitle, Button, Modal } from "@/shared/ui";
import { useRef } from "react";
import { Link } from "react-router";
import styles from "./header.module.css";

export const Header = () => {
    const [isOpened, open, close] = useBoolean(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <header className={styles.header}>
            <Link to={ROUTES.index}>
                <BrandTitle className={styles.title} />
            </Link>
            <Button
                onClick={() => {
                    open();
                    inputRef.current?.focus();
                }}
            >
                Create new board
            </Button>
            {isOpened && (
                <Modal title={"Create new board"} close={close}>
                    <CreateBoardForm inputRef={inputRef} />
                </Modal>
            )}
        </header>
    );
};
