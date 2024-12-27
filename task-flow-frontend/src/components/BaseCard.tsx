import { ReactNode } from "react";
import classes from "./BaseCard.module.scss"

export function BaseCard({ children }: { children: ReactNode }) {
    return <div className={classes.card}>
        {children}
    </div>
}