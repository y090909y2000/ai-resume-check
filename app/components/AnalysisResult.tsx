"use client";

import { useEffect, useRef } from "react";
import type { AnalyzeResponse } from "../lib/analysis";

export default function AnalysisResult({ result }: { result: AnalyzeResponse }) {
  const topRef = useRef<HTMLDivElement>(null);

  // 分析完成後自動捲到建議區
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [result]);

  const total = result.aspects.reduce((n, a) => n + a.suggestions.length, 0);

  return (
    <div
      ref={topRef}
      className="flex scroll-mt-4 flex-col gap-6 pt-8 wrap-anywhere"
    >
      {/* 總評與目錄 */}
      <section className="rounded-2xl bg-ink p-6 text-card sm:p-9">
        <p className="text-xs font-semibold tracking-[0.25em] text-marker">
          健檢報告 · 共 {total} 條建議
        </p>
        <h2 className="mt-3 font-serif text-3xl font-black">總評</h2>
        <p className="mt-4 leading-8 text-card/85">{result.overall}</p>
        <nav aria-label="分析面向" className="mt-7">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {result.aspects.map((aspect) => (
              <li key={aspect.id}>
                <a
                  href={`#${aspect.id}`}
                  className="flex h-full flex-col rounded-xl border border-card/20 px-3 py-3 transition-colors hover:border-marker"
                >
                  <span className="font-serif text-2xl font-black text-marker">
                    {aspect.suggestions.length}
                  </span>
                  <span className="mt-1 text-xs text-card/75">
                    {aspect.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-5 text-xs text-card/60">
          內容由 AI 產生，引用的原句請對照你的履歷確認。
        </p>
      </section>

      {result.aspects.map((aspect) => (
        <section key={aspect.id} id={aspect.id} className="scroll-mt-4 pt-4">
          <h3 className="font-serif text-2xl font-black">
            <span className="marker">{aspect.label}</span>
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{aspect.summary}</p>

          {aspect.suggestions.length === 0 ? (
            <p className="mt-4 rounded-xl border border-green/30 bg-green/5 px-4 py-3 text-sm text-green">
              ✓ 沒有需要逐句修改的地方。
            </p>
          ) : (
            <ol className="mt-5 flex flex-col gap-4">
              {aspect.suggestions.map((item, index) => (
                <li
                  key={index}
                  className="card overflow-hidden text-sm leading-7"
                >
                  <div className="border-b border-dashed border-line px-5 py-5 sm:px-7">
                    <p className="font-mono text-xs text-muted">
                      原句 {String(index + 1).padStart(2, "0")}
                    </p>
                    <blockquote className="mt-2 text-base leading-8 whitespace-pre-wrap">
                      <span className="marker">{item.quote}</span>
                    </blockquote>
                  </div>
                  <dl className="grid md:grid-cols-2">
                    <div className="px-5 py-5 sm:px-7">
                      <dt className="font-semibold text-red">✕ 問題</dt>
                      <dd className="mt-1 whitespace-pre-wrap">
                        {item.problem}
                      </dd>
                    </div>
                    <div className="bg-green/5 px-5 py-5 sm:px-7">
                      <dt className="font-semibold text-green">✓ 改法</dt>
                      <dd className="mt-1 whitespace-pre-wrap">{item.fix}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
