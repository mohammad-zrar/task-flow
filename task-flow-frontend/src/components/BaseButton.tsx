import { ReactNode } from "react";
import classes from "./BaseButton.module.scss";

interface BaseButtonProps {
    children: ReactNode;
    variant?: 'fill' | 'outlined' | 'flat';
    color?: 'primary' | 'danger' | 'success';
    type?: 'button' | 'submit' | 'reset';
}

export default function BaseButton({ children, variant = "fill", color = "primary", type = "button" }: BaseButtonProps) {
    return (
        <button type={type} className={`${classes.baseButton} ${classes[variant]} ${classes[color]}`}>
            {children}
        </button>
    );
}
