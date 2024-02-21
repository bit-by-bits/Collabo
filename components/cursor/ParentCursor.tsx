import SVG from "@/public/cursor";

type Props = { color: string; x: number; y: number; message?: string };

const ParentCursor = ({ color, x, y, message }: Props) => (
  <div
    className="pointer-events-none absolute left-0 top-0"
    style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
  >
    <SVG color={color} />
    {message && (
      <div
        className="absolute left-2 top-5 rounded-3xl px-4 py-2 bg-white"
        style={{ backgroundColor: color, borderRadius: 20 }}
      >
        <p className="whitespace-nowrap text-sm leading-relaxed text-white">
          {message}
        </p>
      </div>
    )}
  </div>
);

export default ParentCursor;
