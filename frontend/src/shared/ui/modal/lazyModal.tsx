import { Suspense, lazy, type PropsWithChildren } from "react";

const Modal = lazy(() => import("./modal").then((module) => ({ default: module.Modal })));

interface LazyModalProps extends PropsWithChildren {
    title?: string;
    onClose: () => void;
}

export const LazyModal = ({ children, title, onClose }: LazyModalProps) => {
    return (
        <Suspense fallback={null}>
            <Modal close={onClose} title={title}>
                {children}
            </Modal>
        </Suspense>
    );
};
