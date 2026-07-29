export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="emptyState">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}
