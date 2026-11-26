import type { Metadata } from "next";
import ApiKeyForm from "../components/ApiKeyForm";
import ResumeAnalyzer from "../components/ResumeAnalyzer";

export const metadata: Metadata = {
  title: "開始健檢｜AI 履歷健檢",
};

export default function CheckPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-12 sm:py-16">
      <div className="mb-2">
        <h1 className="font-serif text-3xl font-black sm:text-4xl">
          把履歷<span className="marker">交給紅筆</span>
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
          準備好金鑰、上傳 PDF、選擇職缺類型，就能開始。
        </p>
      </div>
      <ApiKeyForm />
      <ResumeAnalyzer />
    </main>
  );
}
