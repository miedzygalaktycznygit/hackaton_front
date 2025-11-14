import React from "react";
import styles from "./Input.module.css";

type ImputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    props?: any;
};

export function Input({ label, error, props, ...rest }: ImputProps) {
    return (
        <div className={styles.wrap}>
            <label className={styles.label}>
                {label}
            </label>
            <input className={styles.input} {...props} {...rest} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}