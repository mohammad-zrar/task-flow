import BaseButton from "../components/BaseButton";
import BaseTask from "../components/BaseTask";
import PageContainer from "../components/PageContainer";
import classes from './HomePage.module.scss';
import BaseDialog from "../components/BaseDialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTasks } from "../redux/slices/taskSlice";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <PageContainer>
            <section className={classes.hero}>
                <h3>Tasks</h3>
                <BaseButton onClick={() => setDialogOpen(true)}>New</BaseButton>
            </section>

            <section className={classes.features}>
                {loading && <p className={classes.loading}>Loading tasks...</p>}
                {error && <p className={classes.error}>Error: {error}</p>}
                {!loading && !error && tasks.length === 0 && (
                    <p className={classes.noTasks}>No tasks available. Add a new task!</p>
                )}
                <ul className={classes.taskList}>
                    {tasks.map(task => (
                        <li key={task.id} className={classes.taskItem}>
                            <BaseTask>{task.title}</BaseTask>
                        </li>
                    ))}
                </ul>
            </section>

            <div>
                <BaseDialog
                    isOpen={isDialogOpen}
                    title="Create New Task"
                    onClose={() => setDialogOpen(false)}
                    footer={
                        <>
                            <button onClick={() => setDialogOpen(false)}>Cancel</button>
                            <button onClick={() => alert("Task Created!")}>Confirm</button>
                        </>
                    }
                >
                    <p>This is the body of the dialog. Add task creation content here!</p>
                </BaseDialog>
            </div>
        </PageContainer>
    );
}
