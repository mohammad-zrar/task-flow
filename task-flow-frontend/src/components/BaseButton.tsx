import { ReactNode } from "react";
import classes from "./BaseButton.module.scss";
import { useNavigate } from "react-router";

interface BaseButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'fill' | 'outlined' | 'flat';
    color?: 'primary' | 'danger' | 'success';
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    to?: string;
}

function Spinner() {
    return <div className={classes.spinner}></div>
}

export default function BaseButton({ children, onClick, variant = "fill", color = "primary", type = "button", loading = false, to }: BaseButtonProps) {
    const navigate = useNavigate();
    if (to) {
        type = "button"
        onClick = () => { navigate(to) }
    }

    return (
        <button type={type} className={`${classes.baseButton} ${classes[variant]} ${classes[color]}`} onClick={onClick} >
            {loading ? <Spinner /> : children}
        </button>
    );
}
