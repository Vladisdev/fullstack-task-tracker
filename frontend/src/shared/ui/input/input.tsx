import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./input.module.css";

type InputProps = {} & ComponentPropsWithRef<"input">;

export const Input = ({ className, type, ...props }: InputProps) => {
    return (
        <input
            type={type ?? "text"}
            className={clsx(styles.input, className)}
            {...props}
        />
    );
};
