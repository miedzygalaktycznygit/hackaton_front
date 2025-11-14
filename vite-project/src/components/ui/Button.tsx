import React from "react";
import styles from "./Button.module.css";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isTrue?: boolean;
};

export function Button({children, isTrue, ...rest }: ButtonProps) {
    return (
        <button className={styles.button} disabled={isTrue} {...rest}>
            {isTrue ? 'Ładuje się' : children}
        </button>
    );
}