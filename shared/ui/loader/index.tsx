export default function Loader({
  className,
  title = "Loading...",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div className={`flex items-center justify-center px-4 ${className || ""}`}>
      <p className="text-xl text-gray-200">{title}</p>
    </div>
  );
}
