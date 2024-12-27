import { ReactNode } from "react";
import classes from "./AuthPageContainer.module.scss"

export default function AuthPageContainer({ children }: { children: ReactNode }) {
    return <div className={classes.container}>
        <header className={classes.header}>
            <img src="/logo.png" alt="Task Flow Logo" />
        </header>
        <main>
            {children}
        </main>

    </div>
}