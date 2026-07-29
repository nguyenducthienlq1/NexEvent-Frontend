import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./Input.module.css";

type FieldProps = {
  label: string;
  error?: string;
  helperText?: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldProps;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldProps;

function FieldMessage({
  error,
  helperText,
}: {
  error?: string;
  helperText?: string;
}) {
  const message = error || helperText;
  if (!message) return null;

  return (
    <span className={`${styles.message} ${error ? styles.errorText : ""}`}>
      {message}
    </span>
  );
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}: InputProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        className={`${styles.input} ${error ? styles.error : ""} ${className}`.trim()}
        aria-invalid={!!error}
        {...props}
      />
      <FieldMessage error={error} helperText={helperText} />
    </label>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ""} ${className}`.trim()}
        aria-invalid={!!error}
        {...props}
      />
      <FieldMessage error={error} helperText={helperText} />
    </label>
  );
}

export function Select({
  label,
  error,
  helperText,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select
        className={`${styles.select} ${error ? styles.error : ""} ${className}`.trim()}
        aria-invalid={!!error}
        {...props}
      >
        {children}
      </select>
      <FieldMessage error={error} helperText={helperText} />
    </label>
  );
}
