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
    dense?: boolean; // New prop for compact button
}

function Spinner() {
    return <div className={classes.spinner}></div>;
}

export default function BaseButton({
    children,
    onClick,
    variant = "fill",
    color = "primary",
    type = "button",
    loading = false,
    to,
    dense = false, // Default to false
}: BaseButtonProps) {
    const navigate = useNavigate();
    if (to) {
        type = "button";
        onClick = () => {
            navigate(to);
        };
    }

    return (
        <button
            type={type}
            className={`${classes.baseButton} ${classes[variant]} ${classes[color]} ${dense ? classes.dense : ""}`}
            onClick={onClick}
        >
            {loading ? <Spinner /> : children}
        </button>
    );
}
