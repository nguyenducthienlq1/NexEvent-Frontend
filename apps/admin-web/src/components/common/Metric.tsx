export function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <section className="metricCard">
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  );
}
