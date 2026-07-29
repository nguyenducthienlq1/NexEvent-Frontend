import type { ReactNode, HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  interactive,
  glass,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${interactive ? styles.interactive : ""} ${glass ? styles.glass : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.header} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.body} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.footer} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
