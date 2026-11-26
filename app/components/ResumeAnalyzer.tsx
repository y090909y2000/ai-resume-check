"use client";

import { useState, type SyntheticEvent } from "react";
import {
  API_KEY_HEADER,
  JOB_TYPES,
  MAX_PDF_BYTES,
  type AnalyzeError,
  type AnalyzeResponse,
} from "../lib/analysis";
import { useApiKey } from "../lib/api-key-store";
import AnalysisResult from "./AnalysisResult";
import StepTitle from "./StepTitle";

export default function ResumeAnalyzer() {
  const apiKey = useApiKey();
  const [file, setFile] = useState<File | null>(null);
  const [jobType, setJobType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  // 換了檔案或職缺後，舊的結果就不再適用
  function resetOutput() {
    setError("");
    setResult(null);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!apiKey || !file || !jobType || loading) return;
    resetOutput();
    if (file.size > MAX_PDF_BYTES) {
      setError("PDF 不能超過 4MB。");
      return;
    }
    setLoading(true);

    const body = new FormData();
    body.append("file", file);
    body.append("jobType", jobType);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { [API_KEY_HEADER]: apiKey },
        body,
      });
      // 伺服器異常時回應可能不是 JSON
      const data: AnalyzeResponse | AnalyzeError | null = await res
        .json()
        .catch(() => null);

      if (!data || "error" in data || !res.ok) {
        setError(data && "error" in data ? data.error : "分析失敗，請稍後再試。");
        return;
      }
      setResult(data);
    } catch {
      setError("連線失敗，請檢查網路後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="card flex flex-col gap-7 p-5 sm:p-7"
      >
        <div>
          <StepTitle number={2} title="上傳履歷" />
          {/* 透明的 file input 蓋滿整個區塊，點擊或拖曳檔案都可以 */}
          <div
            className={`relative mt-4 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors focus-within:border-ink focus-within:ring-2 focus-within:ring-marker ${
              file ? "border-green/50 bg-green/5" : "border-line bg-white/60"
            } ${loading ? "opacity-60" : "hover:border-red"}`}
          >
            <input
              type="file"
              accept="application/pdf,.pdf"
              aria-label="履歷 PDF"
              disabled={loading}
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                resetOutput();
              }}
              className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            />
            <span
              aria-hidden
              className="mx-auto grid h-14 w-11 place-items-center rounded-md border border-line bg-card font-mono text-[11px] font-bold text-red shadow-sm"
            >
              PDF
            </span>
            <p className="mt-4 font-semibold break-all">
              {file ? file.name : "點一下選擇檔案，或拖曳到這裡"}
            </p>
            <p className="mt-1 text-xs text-muted">
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB · 點一下可更換`
                : "僅支援 PDF，4MB 以內"}
            </p>
          </div>
        </div>

        <div>
          <StepTitle number={3} title="目標職缺類型" />
          <fieldset disabled={loading} className="mt-4 min-w-0">
            <legend className="sr-only">目標職缺類型</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((job) => (
                <label
                  key={job.id}
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-line bg-white/60 px-2 py-3 text-center text-sm transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-card has-focus-visible:ring-2 has-focus-visible:ring-red has-disabled:cursor-not-allowed has-disabled:opacity-60"
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={job.id}
                    checked={jobType === job.id}
                    onChange={(e) => {
                      setJobType(e.target.value);
                      resetOutput();
                    }}
                    className="sr-only"
                  />
                  {job.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <button
            type="submit"
            disabled={!apiKey || !file || !jobType || loading}
            className="btn-primary w-full px-6 py-4"
          >
            {loading && (
              <span
                aria-hidden
                className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              />
            )}
            {loading ? "批改中…" : "開始健檢"}
          </button>

          <div aria-live="polite" className="text-center text-sm">
            {loading && (
              <p className="mt-3 text-muted">
                AI 正在閱讀你的履歷，請留在這個頁面。
              </p>
            )}
            {apiKey === "" && (
              <p className="mt-3 text-muted">
                請先在上方儲存 OpenAI API Key。
              </p>
            )}
          </div>
          {error && (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-red/30 bg-red/5 px-4 py-3 text-sm text-red"
            >
              {error}
            </p>
          )}
        </div>
      </form>

      {result && <AnalysisResult result={result} />}
    </>
  );
}
