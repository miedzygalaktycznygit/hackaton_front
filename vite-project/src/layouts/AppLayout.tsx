import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export function AppLayout() {
    return (
        <div className={styles.appLayout}>
            <header className={styles.header}>
                <h1>Aplikacja do zdj</h1>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}