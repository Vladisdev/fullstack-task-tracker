import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./input.module.css";

type InputProps = {} & ComponentPropsWithRef<"input">;

export const Input = ({ className, ...props }: InputProps) => {
    return <input className={clsx(styles.input, className)} {...props} />;
};
