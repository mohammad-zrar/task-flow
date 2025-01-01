import { ReactNode } from "react";
import classes from "./PageContainer.module.scss"
import { BaseCard } from "./BaseCard";

export default function AuthPageContainer({ children }: { children: ReactNode }) {
    return <div className={classes.container}>
        <header className={classes.header}>
            <img src="/logo.png" alt="Task Flow Logo" />
        </header>
        <main>
            <div className={classes.content}>
                <BaseCard>
                    {children}
                </BaseCard>
            </div>

        </main>

    </div>
}