"use client";

import { useState, type SyntheticEvent } from "react";
import { removeApiKey, saveApiKey, useApiKey } from "../lib/api-key-store";
import StepTitle from "./StepTitle";

// 只露出頭尾幾個字，方便辨認是哪一把金鑰
function maskKey(key: string) {
  return `${key.slice(0, 3)}••••••••${key.slice(-4)}`;
}

export default function ApiKeyForm() {
  const savedKey = useApiKey();
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = input.trim();

    // 只做基本格式檢查，不會呼叫 OpenAI 驗證金鑰是否有效
    if (!key.startsWith("sk-") || key.length < 20 || /\s/.test(key)) {
      setError("格式看起來不對，OpenAI API Key 是以 sk- 開頭的一長串文字。");
      return;
    }

    try {
      saveApiKey(key);
    } catch {
      setError("無法儲存，請確認瀏覽器沒有封鎖網站儲存空間。");
      return;
    }
    setInput("");
    setVisible(false);
    setError("");
  }

  return (
    <section className="card w-full p-5 sm:p-7">
      <StepTitle number={1} title="OpenAI API Key" />
      <p className="mt-3 text-sm leading-7 text-muted">
        金鑰存在這個瀏覽器裡；分析時會經由我們的伺服器轉送給 OpenAI，我們不會保存它。
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 font-medium text-red underline underline-offset-4"
        >
          到 OpenAI 申請金鑰 ↗
        </a>
      </p>

      {savedKey === null ? (
        <p className="mt-4 text-sm text-muted">讀取中…</p>
      ) : savedKey ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green/30 bg-green/5 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-green">✓ 金鑰已儲存</p>
            <p className="font-mono text-sm break-all text-muted">
              {maskKey(savedKey)}
            </p>
          </div>
          <button
            type="button"
            onClick={removeApiKey}
            className="rounded-full border border-line bg-card px-4 py-2 text-sm hover:border-red hover:text-red"
          >
            清除金鑰
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type={visible ? "text" : "password"}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              placeholder="貼上你的金鑰（sk-...）"
              aria-label="OpenAI API Key"
              autoComplete="off"
              spellCheck={false}
              className="w-full min-w-0 rounded-xl border border-line bg-white px-4 py-3 font-mono text-base outline-none focus:border-ink focus:ring-2 focus:ring-marker sm:flex-1 sm:text-sm"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="shrink-0 rounded-full border border-line px-5 py-2.5 text-sm hover:border-ink"
              >
                {visible ? "隱藏" : "顯示"}
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="btn-primary flex-1 px-6 py-2.5 text-sm"
              >
                儲存
              </button>
            </div>
          </div>
          {error && (
            <p role="alert" className="mt-3 text-sm text-red">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
