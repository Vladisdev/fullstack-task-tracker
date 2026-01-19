import { useClickOutside } from "@/shared/lib/useClickOutside";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Title } from "../title/title";
import styles from "./modal.module.css";

interface ModalProps extends PropsWithChildren {
    title?: string;
    close: () => void;
}

export const Modal = ({ children, title, close, ...props }: ModalProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(contentRef, close);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && close();

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [close]);

    return createPortal(
        <div className={styles.window} {...props}>
            <div ref={contentRef} className={styles.content}>
                <header className={styles.title}>
                    {title && <Title element="h2" text={title} />}{" "}
                    <button onClick={close}>X</button>
                </header>
                <section className={styles.body}>{children}</section>
            </div>
        </div>,
        document.body,
    );
};
