// 前端和 API 共用的常數與型別（回傳結構以這裡為準）

export const JOB_TYPES = [
  { id: "software", label: "軟體工程" },
  { id: "product", label: "產品／專案管理" },
  { id: "marketing", label: "行銷企劃" },
  { id: "design", label: "設計" },
  { id: "sales", label: "業務／客戶服務" },
  { id: "admin", label: "行政／人資" },
  { id: "finance", label: "財務會計" },
  { id: "general", label: "其他／不限" },
] as const;

// 固定的分析面向，畫面依照這個順序顯示
export const ASPECTS = [
  { id: "relevance", label: "職缺匹配度", guide: "經歷與技能是否切合目標職缺，缺少哪些重點" },
  { id: "achievements", label: "成果與量化", guide: "是否只寫工作內容而沒有成果、數據與影響" },
  { id: "wording", label: "用詞與表達", guide: "語句是否清楚精簡，有無空泛、冗贅、錯字或語病" },
  { id: "structure", label: "結構與可讀性", guide: "段落順序、資訊層次、版面是否好掃讀" },
] as const;

export type AspectId = (typeof ASPECTS)[number]["id"];

// 檔案上限 4MB（部署到 Vercel 時，請求內容上限約 4.5MB）
export const MAX_PDF_BYTES = 4 * 1024 * 1024;

// 傳送金鑰用的 HTTP header
export const API_KEY_HEADER = "x-openai-key";

export type Suggestion = {
  quote: string; // 履歷裡的原句
  problem: string; // 問題
  fix: string; // 改法
};

export type AspectResult = {
  id: AspectId;
  label: string;
  summary: string;
  suggestions: Suggestion[]; // 該面向沒有問題時是空陣列
};

// API 成功時的回傳
export type AnalyzeResponse = {
  overall: string;
  aspects: AspectResult[]; // 固定包含 ASPECTS 的每一項，順序相同
};

// API 失敗時的回傳
export type AnalyzeError = { error: string };
