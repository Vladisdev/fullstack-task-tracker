import { ColumnComponent, type Column } from "@/entities";
import styles from "./columnsList.module.css";

type ColumnsListProps = {
    columns: Column[];
};

export const ColumnsList = ({ columns }: ColumnsListProps) => {
    return (
        <ul className={styles.list}>
            {columns.map((column) => (
                <ColumnComponent key={column.id} column={column} />
            ))}
        </ul>
    );
};
