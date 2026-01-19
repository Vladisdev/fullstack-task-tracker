import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    variant?: null;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
    return (
        <button className={clsx(styles.button, className)} {...props}>
            {children}
        </button>
    );
};
