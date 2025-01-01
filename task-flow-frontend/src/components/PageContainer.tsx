import { ReactNode } from "react";
import classes from "./PageContainer.module.scss"
import { BaseCard } from "./BaseCard";
import BaseButton from "./BaseButton";
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export default function PageContainer({ children }: { children: ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    }

    return <div className={classes.container}>
        <header className={classes.header}>
            <img src="/logo.png" alt="Task Flow Logo" />

            {isLoggedIn && <BaseButton variant="outlined" onClick={handleLogout} color="danger">Logout</BaseButton>}
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