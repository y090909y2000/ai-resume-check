"use client";

import { useSyncExternalStore } from "react";

// OpenAI API Key 只存在使用者瀏覽器的 localStorage
const STORAGE_KEY = "openai-api-key";
// 同一個分頁修改 localStorage 不會觸發 "storage" 事件，所以自己發一個
const CHANGE_EVENT = "openai-api-key-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    // 瀏覽器封鎖儲存空間時，當作沒有存過
    return "";
  }
}

// 伺服器讀不到 localStorage，回傳 null 代表「還不知道」
function getServerSnapshot() {
  return null;
}

export function useApiKey() {
  return useSyncExternalStore<string | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

export function saveApiKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function removeApiKey() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
