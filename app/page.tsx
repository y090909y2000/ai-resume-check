import Link from "next/link";
import { ASPECTS, JOB_TYPES } from "./lib/analysis";

const STEPS = [
  {
    title: "貼上你的金鑰",
    text: "使用你自己的 OpenAI API Key。存在瀏覽器裡，下次回來不用重貼。",
  },
  {
    title: "上傳履歷、選職缺",
    text: "一份 4MB 以內的 PDF，加上你想應徵的職缺類型。",
  },
  {
    title: "拿到逐句批改",
    text: "依面向整理建議，每一條都有原句、問題和改法。",
  },
];

export default function Home() {
  return (
    <main className="w-full overflow-x-clip">
      {/* 主視覺 */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em] text-red">
            逐句批改你的履歷
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.3] font-black sm:text-6xl sm:leading-[1.25]">
            你的履歷，
            <br />
            <span className="marker">哪一句</span>該改？
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">
            不給空泛的「建議再具體一點」。AI
            會引用你履歷裡的原句，說明問題在哪，再告訴你可以怎麼改。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/check" className="btn-primary px-8 py-4">
              上傳履歷開始健檢 <span aria-hidden>→</span>
            </Link>
            <a
              href="#how"
              className="py-2 text-center text-sm font-medium underline underline-offset-4 hover:text-red"
            >
              先看怎麼運作
            </a>
          </div>
        </div>

        <SamplePaper />
      </section>

      {/* 使用步驟 */}
      <section id="how" className="border-y border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="font-serif text-2xl font-black sm:text-3xl">
            三個步驟
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <span className="font-serif text-4xl font-black text-red">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 分析面向 */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
        <h2 className="font-serif text-2xl font-black sm:text-3xl">
          {ASPECTS.length} 個面向，一次看完
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {ASPECTS.map((aspect) => (
            <li key={aspect.id} className="card p-6 sm:p-8">
              <h3 className="font-serif text-xl font-black">
                <span className="marker">{aspect.label}</span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {aspect.guide}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <p className="text-sm font-semibold">可選的職缺類型</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {JOB_TYPES.map((job) => (
              <li
                key={job.id}
                className="rounded-full border border-line bg-card px-4 py-1.5 text-sm text-muted"
              >
                {job.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 隱私與結尾 */}
      <section className="bg-ink text-card">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-black sm:text-3xl">
              你的資料去了哪裡
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-card/75">
              <li>金鑰存在你的瀏覽器裡，分析時經由我們的伺服器轉送給 OpenAI。</li>
              <li>我們不會保存你的金鑰和履歷 PDF。</li>
              <li>
                履歷內容會交給 OpenAI 分析，並依 OpenAI 的資料政策處理。
              </li>
              <li>分析費用從你的 OpenAI 帳戶扣除。</li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center lg:items-end lg:text-right">
            <p className="font-serif text-3xl leading-snug font-black sm:text-4xl">
              投出去之前，
              <br />
              先讓紅筆看一遍。
            </p>
            <Link
              href="/check"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-marker px-8 py-4 font-semibold text-ink transition-colors hover:bg-card sm:w-auto"
            >
              開始健檢
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// 首頁右側的批改示意圖（虛構內容）
function SamplePaper() {
  return (
    <figure className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden
        className="absolute inset-0 rotate-3 rounded-2xl border border-line bg-card/60"
      />
      <div className="card relative -rotate-1 p-6 sm:p-8">
        <p className="font-serif text-lg font-black">工作經歷</p>
        <div aria-hidden className="mt-3 space-y-2">
          <div className="h-2 w-2/3 rounded bg-line" />
          <div className="h-2 w-1/2 rounded bg-line" />
        </div>

        <p className="mt-6 text-base leading-8">
          <span className="marker">負責公司社群經營，成效良好。</span>
        </p>

        <div className="mt-4 -rotate-1 border-l-2 border-red pl-4 text-sm leading-7">
          <p className="text-red">
            <strong>問題：</strong>「成效良好」看不出做了什麼、好多少。
          </p>
          <p className="mt-2 text-green">
            <strong>改法：</strong>
            經營公司社群，〔請填入期間〕內追蹤數成長〔請填入數字〕%。
          </p>
        </div>

        <div aria-hidden className="mt-7 space-y-2">
          <div className="h-2 w-full rounded bg-line" />
          <div className="h-2 w-5/6 rounded bg-line" />
          <div className="h-2 w-3/4 rounded bg-line" />
        </div>
      </div>
      <figcaption className="relative mt-5 text-center text-xs text-muted">
        批改示意，內容為虛構範例
      </figcaption>
    </figure>
  );
}
