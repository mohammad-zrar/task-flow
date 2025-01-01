import BaseButton from "./BaseButton";
import classes from "./BaseTask.module.scss";

interface BaseTaskProps {
    children: React.ReactNode;
}

export default function BaseTask({ children }: BaseTaskProps) {
    return (
        <div className={classes.baseTask}>
            <p>{children}</p>
            <div className={classes.actions}>
                <BaseButton color="success">Complete</BaseButton>
                <BaseButton color="danger">Delete</BaseButton>
            </div>
        </div>
    )
}