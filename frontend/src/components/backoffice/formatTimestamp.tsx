export default function formatTimestamp(timestamp: string): string {
  const timestamp2 = parseInt(timestamp, 10);
  const date = new Date(timestamp2);

  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0"); //getmonth() returns 0-11
  const d = date.getDate().toString().padStart(2, "0");
  return `${d}/${m}/${y}`;
}
