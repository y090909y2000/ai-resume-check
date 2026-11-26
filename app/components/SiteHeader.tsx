import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 -rotate-6 place-items-center rounded-full border-2 border-red font-serif text-sm font-black text-red"
          >
            閱
          </span>
          <span className="font-serif text-lg font-black tracking-wide">
            AI 履歷健檢
          </span>
        </Link>
        <Link href="/check" className="btn-primary px-4 py-2 text-sm">
          開始健檢
        </Link>
      </div>
    </header>
  );
}
