import BaseButton from "../components/BaseButton";
import BaseTask from "../components/BaseTask";
import PageContainer from "../components/PageContainer";
import classes from './HomePage.module.scss';

export default function HomePage() {
    return (
        <PageContainer>
            <section className={classes.hero}>
                <h3>Tasks</h3>
                <BaseButton  >New</BaseButton>
            </section>
            <section className={classes.features}>
                <BaseTask>Task 1</BaseTask>
            </section>
        </PageContainer>
    );
}