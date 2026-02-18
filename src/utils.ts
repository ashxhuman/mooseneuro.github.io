export function formatDate(date: Date | string): string {
  const dt = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dt.toLocaleDateString("en-UK", options);
}
