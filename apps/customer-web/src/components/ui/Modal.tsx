import type { PropsWithChildren } from "react";
import styles from "./Modal.module.css";

type ModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  onClose: () => void;
}>;

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close modal"
            onClick={onClose}
          >
            x
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
}
