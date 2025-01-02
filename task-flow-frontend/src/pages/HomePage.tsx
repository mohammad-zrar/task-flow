import BaseButton from "../components/BaseButton";
import BaseTask from "../components/BaseTask";
import PageContainer from "../components/PageContainer";
import classes from "./HomePage.module.scss";
import BaseDialog from "../components/BaseDialog";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createTask, deleteTask, fetchTasks } from "../redux/slices/taskSlice";
import BaseInput from "../components/BaseInput";
import { Task } from "../types/entity-types";
import { updateTask } from "../redux/slices/taskSlice";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedTaskToDelete, setSelectedTaskToDelete] = useState<Task | null>(null);

    const [formData, setFormData] = useState({ title: "" });
    // Optional: For user feedback (e.g., toast messages)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const openDeleteDialog = (task: Task) => {
        setSelectedTaskToDelete(task);
        setDeleteDialogOpen(true);
    }

    const handleDelete = async () => {
        if (!selectedTaskToDelete) return;
        await dispatch(deleteTask(selectedTaskToDelete.id));
        setDeleteDialogOpen(false);
    }

    const handleUpdate = (task: Task) => async () => {
        await dispatch(updateTask({ ...task, completed: !task.completed }));
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createTask(formData)).unwrap();
            // Optional success handling
            setSuccessMessage("Task created successfully!");
            setDialogOpen(false);
            setFormData({ title: "" });
            // Clear success message automatically after a few seconds
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            console.error("Task creation failed:", err);
        }
    };


    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    return (
        <PageContainer>
            <section className={classes.hero}>
                <h3>Tasks</h3>
                <BaseButton onClick={() => setDialogOpen(true)}>New</BaseButton>
            </section>

            {successMessage && <div className={classes.success}>{successMessage}</div>}
            {error && <p className={classes.error}>Error: {error}</p>}

            <section className={classes.features}>
                {loading && tasks.length === 0 && (
                    <p className={classes.loading}>Loading tasks...</p>
                )}

                {!loading && !error && tasks.length === 0 && (
                    <p className={classes.noTasks}>No tasks available. Add a new task!</p>
                )}

                <ul className={classes.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} className={classes.taskItem}>
                            <BaseTask onDelete={() => openDeleteDialog(task)} onToggleComplete={handleUpdate(task)} completed={!!task.completed}>{task.title}</BaseTask>
                        </li>
                    ))}
                </ul>
            </section>

            <BaseDialog isOpen={isDeleteDialogOpen} title="Delete Task" onClose={() => setDeleteDialogOpen(false)} footer={
                <>
                    <BaseButton
                        onClick={() => setDeleteDialogOpen(false)}
                        variant="flat"
                        dense
                    >
                        Cancel
                    </BaseButton>
                    <BaseButton color="danger" onClick={handleDelete} dense disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </BaseButton>
                </>
            }>
                <p>Are you sure to delete ({selectedTaskToDelete?.title}) task?</p>
            </BaseDialog>

            <form onSubmit={handleSubmit}>
                <BaseDialog
                    isOpen={isDialogOpen}
                    title="Create New Task"
                    onClose={() => setDialogOpen(false)}
                    footer={
                        <>
                            <BaseButton
                                onClick={() => setDialogOpen(false)}
                                variant="flat"
                                dense
                            >
                                Cancel
                            </BaseButton>
                            <BaseButton type="submit" dense disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </BaseButton>
                        </>
                    }
                >
                    <BaseInput
                        value={formData.title}
                        name="title"
                        onChange={handleChange}
                        label="Title"
                        placeholder="Enter task title"
                    />
                </BaseDialog>
            </form>

        </PageContainer>


    );
}
