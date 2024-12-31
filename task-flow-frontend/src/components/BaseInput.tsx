import classes from "./BaseInput.module.scss";
import { useId, ChangeEvent } from 'react';

interface BaseInputProps {
    value: string;
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function BaseInput({ value, label, name, placeholder, type = 'text', onChange }: BaseInputProps) {
    const inputId = useId();

    return (
        <div className={classes.formController}>
            {label && <label className={classes.label} htmlFor={inputId}>{label}</label>}
            <input
                id={inputId}
                value={value}
                name={name}
                className={classes.inputField}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            />
        </div>
    );
}
