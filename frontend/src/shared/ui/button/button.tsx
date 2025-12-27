import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./button.module.css";

type ButtonProps = {} & ComponentPropsWithRef<"button">;

export const Button = ({ className, children, ...props }: ButtonProps) => {
    return (
        <button className={clsx(styles.button, className)} {...props}>
            {children}
        </button>
    );
};
