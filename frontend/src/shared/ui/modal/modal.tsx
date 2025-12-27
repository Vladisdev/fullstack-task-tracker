import { type ComponentPropsWithRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Title } from "../title/title";
import styles from "./modal.module.css";

type ModalProps = {
    title?: string;
    ref: RefObject<HTMLDialogElement | null>;
} & ComponentPropsWithRef<"dialog">;

export const Modal = ({ children, title, ref, ...props }: ModalProps) => {
    return createPortal(
        <dialog ref={ref} className={styles.window} {...props}>
            <header className={styles.title}>
                {title && <Title element="h2" text={title} />}{" "}
                <button onClick={() => ref.current?.close()}>X</button>
            </header>
            <section className={styles.body}>{children}</section>
        </dialog>,
        document.body,
    );
};
