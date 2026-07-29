import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.error : ""} ${className}`.trim()}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ""} ${className}`.trim()}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
