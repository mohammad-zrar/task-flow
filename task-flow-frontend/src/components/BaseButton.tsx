import { ReactNode } from "react";
import classes from "./BaseButton.module.scss";
import { useNavigate } from "react-router";

interface BaseButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: "fill" | "outlined" | "flat";
    color?: "primary" | "danger" | "success";
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    to?: string;
    dense?: boolean; // For a compact button
    disabled?: boolean; // ← New prop
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
    dense = false,
    disabled = false, // ← Default value
}: BaseButtonProps) {
    const navigate = useNavigate();

    // If `to` is provided, this button navigates instead of acting as a normal button
    if (to) {
        type = "button";
        onClick = () => {
            navigate(to);
        };
    }

    return (
        <button
            type={type}
            className={`
        ${classes.baseButton} 
        ${classes[variant]} 
        ${classes[color]} 
        ${dense ? classes.dense : ""}
      `}
            onClick={onClick}
            disabled={disabled || loading}
        /*
         *  Note: 
         *   1) `disabled` is true if the user explicitly sets `disabled` to true.
         *   2) We also disable the button automatically when `loading` is true, 
         *      preventing double-clicks or multiple submissions.
         */
        >
            {loading ? <Spinner /> : children}
        </button>
    );
}
