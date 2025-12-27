import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import styles from "./container.module.css";

type ContainerProps = {
    size?: "xl" | "l";
} & ComponentPropsWithRef<"div">;

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
