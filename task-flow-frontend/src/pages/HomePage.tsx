import BaseButton from "../components/BaseButton";
import BaseTask from "../components/BaseTask";
import PageContainer from "../components/PageContainer";
import classes from './HomePage.module.scss';
import BaseDialog from "../components/BaseDialog";
import { useState } from "react";

export default function HomePage() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    return (
        <PageContainer>
            <section className={classes.hero}>
                <h3>Tasks</h3>
                <BaseButton onClick={() => setDialogOpen(true)} >New</BaseButton>
            </section>
            <section className={classes.features}>
                <BaseTask>Task 1</BaseTask>
            </section>
            <div>
                <BaseDialog
                    isOpen={isDialogOpen}
                    title="Dialog Title"
                    onClose={() => setDialogOpen(false)}
                    footer={
                        <>
                            <button onClick={() => setDialogOpen(false)}>Cancel</button>
                            <button onClick={() => alert("Confirmed")}>Confirm</button>
                        </>
                    }
                >
                    <p>This is the body of the dialog. Add any content here!</p>
                </BaseDialog>
            </div>
        </PageContainer>
    );
}