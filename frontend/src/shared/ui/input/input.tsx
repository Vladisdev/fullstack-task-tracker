import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./input.module.css";

interface InputProps extends ComponentPropsWithRef<"input"> {
    multiline?: boolean;
}

export const Input = ({ className, type, multiline = false, ...props }: InputProps) => {
    return multiline ? (
        <textarea
            className={clsx(styles.input, className)}
            {...(props as ComponentPropsWithRef<"textarea">)}
        />
    ) : (
        <input
            type={type ?? "text"}
            className={clsx(styles.input, className)}
            {...props}
        />
    );
};
