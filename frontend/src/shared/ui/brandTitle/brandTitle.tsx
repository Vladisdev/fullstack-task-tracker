import clsx from "clsx";
import { Title } from "../title/title";
import styles from "./brandTitle.module.css";

export const BrandTitle = ({ className }: { className?: string }) => {
    return (
        <Title text="Tracker" element="h1" className={clsx(styles.title, className)} />
    );
};
