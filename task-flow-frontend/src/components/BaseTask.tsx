import BaseButton from "./BaseButton";
import classes from "./BaseTask.module.scss";

interface BaseTaskProps {
    children: React.ReactNode;
    onDelete?: () => void;
    onToggleComplete?: () => void;
    completed?: boolean;

}

export default function BaseTask({ children, onDelete, onToggleComplete, completed }: BaseTaskProps) {
    return (
        <div className={classes.baseTask}>
            <p className={`${completed ? classes.completed : classes.uncompleted}`}>{children} {completed}</p>
            <div className={classes.actions}>
                {!completed ? <BaseButton onClick={onToggleComplete} color="success" dense>Complete</BaseButton> : <BaseButton onClick={onToggleComplete} color="primary" dense>Uncomplete</BaseButton>}
                <BaseButton color="danger" onClick={onDelete} dense>Delete</BaseButton>
            </div>
        </div>
    )
}