export default function Blackline({ size }: { size?: number }) {
  return (
    <div
      className="lg:w-full w-[90%] bg-black m-auto lg:m-0"
      style={{ height: `${size ?? 2}px` }}
    ></div>
  );
}
