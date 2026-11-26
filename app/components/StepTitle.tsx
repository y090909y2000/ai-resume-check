export default function StepTitle({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  return (
    <h2 className="flex items-center gap-3 font-serif text-lg font-black">
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-full bg-marker font-mono text-sm"
      >
        {number}
      </span>
      {title}
    </h2>
  );
}
