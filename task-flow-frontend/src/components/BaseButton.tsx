import { ReactNode } from "react";
import classes from "./BaseButton.module.scss";

interface BaseButtonProps {
    children: ReactNode;
    variant?: 'fill' | 'outlined' | 'flat';
    color?: 'primary' | 'danger' | 'success';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
}

function Spinner() {
    return <div className={classes.spinner}></div>
}

export default function BaseButton({ children, variant = "fill", color = "primary", type = "button", loading = false }: BaseButtonProps) {
    return (
        <button type={type} className={`${classes.baseButton} ${classes[variant]} ${classes[color]}`}>
            {loading ? <Spinner /> : children}
        </button>
    );
}
