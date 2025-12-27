import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import { createElement } from "react";
import styles from "./title.module.css";

type Titles = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps = {
    element: Titles;
    text: string;
} & ComponentPropsWithRef<Titles>;

export const Title = ({ element, className, text, ...props }: TitleProps) => {
    return createElement(element, {
        className: clsx(styles.title, className),
        children: text,
        ...props,
    });
};
