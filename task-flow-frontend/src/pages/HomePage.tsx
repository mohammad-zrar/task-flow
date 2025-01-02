import BaseButton from "../components/BaseButton";
import BaseTask from "../components/BaseTask";
import PageContainer from "../components/PageContainer";
import classes from './HomePage.module.scss';
import BaseDialog from "../components/BaseDialog";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createTask, fetchTasks } from "../redux/slices/taskSlice";
import BaseInput from "../components/BaseInput";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createTask(formData)).unwrap();
            setDialogOpen(false);
            setFormData({ title: '' });
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

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
                <form onSubmit={handleSubmit}>
                    <BaseDialog
                        isOpen={isDialogOpen}
                        title="Create New Task"
                        onClose={() => setDialogOpen(false)}
                        footer={
                            <>
                                <BaseButton onClick={() => setDialogOpen(false)} variant="flat" dense>Cancel</BaseButton>
                                <BaseButton type="submit" dense>Save</BaseButton>
                            </>
                        }
                    >

                        <BaseInput value={formData.title} name="title" onChange={handleChange} label="Title" placeholder="Enter task title" />
                    </BaseDialog>
                </form>

            </div>
        </PageContainer>
    );
}
