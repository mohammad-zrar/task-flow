import { ReactNode } from "react";
import classes from "./BaseDialog.module.scss";

interface DialogProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    footer?: ReactNode;
}

export default function BaseDialog({ isOpen, title, children, onClose, footer }: DialogProps) {
    if (!isOpen) return null;

    return (
        <div className={classes["dialog-overlay"]} onClick={onClose}>
            <div
                className={classes.dialog}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
            >
                <header className={classes["dialog-header"]}>
                    <h2 className={classes["dialog-title"]}>{title}</h2>
                    <button className={classes["dialog-close"]} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <div className={classes["dialog-body"]}>{children}</div>
                {footer && <footer className={classes["dialog-footer"]}>{footer}</footer>}
            </div>
        </div>
    );
}
