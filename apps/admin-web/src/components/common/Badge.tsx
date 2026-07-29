function statusTone(status?: string | boolean) {
  if (
    status === true ||
    status === "ACTIVE" ||
    status === "READY" ||
    status === "VALID"
  ) {
    return "good";
  }
  if (
    status === false ||
    status === "INACTIVE" ||
    status === "HIDDEN" ||
    status === "GAP"
  ) {
    return "danger";
  }
  return "neutral";
}

export function Badge({
  value,
  tone,
}: {
  value?: string;
  tone?: "good" | "danger" | "neutral";
}) {
  return (
    <span className={`badge ${tone || statusTone(value)}`}>
      {value || "UNKNOWN"}
    </span>
  );
}
