import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./container.module.css";

interface ContainerProps extends ComponentPropsWithRef<"div"> {
    size?: "xl" | "l";
}

export const Container = ({
    size = "xl",
    children,
    className,
    ...props
}: ContainerProps) => {
    return (
        <div
            className={clsx(styles.container, className, {
                [styles.xl]: size === "xl",
            })}
            {...props}
        >
            {children}
        </div>
    );
};
