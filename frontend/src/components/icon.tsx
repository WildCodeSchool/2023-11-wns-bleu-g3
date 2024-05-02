export default function Icon({
  name,
  size,
  color,
}: {
  name: string;
  size?: string;
  color?: string;
}) {
  return (
    <span className={`material-icons text-${color} text-${size}`}>{name}</span>
  );
}
