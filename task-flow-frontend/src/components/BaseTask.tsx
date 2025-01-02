import BaseButton from "./BaseButton";
import classes from "./BaseTask.module.scss";

interface BaseTaskProps {
    children: React.ReactNode;
    onDelete?: () => void;
}

export default function BaseTask({ children, onDelete }: BaseTaskProps) {
    return (
        <div className={classes.baseTask}>
            <p>{children}</p>
            <div className={classes.actions}>
                <BaseButton color="success" dense>Complete</BaseButton>
                <BaseButton color="danger" onClick={onDelete} dense>Delete</BaseButton>
            </div>
        </div>
    )
}