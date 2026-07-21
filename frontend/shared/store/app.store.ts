"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  price: number;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", price: 19 },
  EUR: { code: "EUR", symbol: "€", price: 18 },
  GBP: { code: "GBP", symbol: "£", price: 15 },
  INR: { code: "INR", symbol: "₹", price: 1599 },
  JPY: { code: "JPY", symbol: "¥", price: 2800 },
  CAD: { code: "CAD", symbol: "C$", price: 26 },
  AUD: { code: "AUD", symbol: "A$", price: 29 },
};

export interface AppState {
  currency: string; // "USD", "EUR", etc.
  setCurrency: (code: string) => void;
  getCurrencyInfo: () => CurrencyInfo;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currency: "USD",
      setCurrency: (code) => {
        if (CURRENCIES[code]) {
          set({ currency: code });
        }
      },
      getCurrencyInfo: () => {
        const state = get();
        return CURRENCIES[state.currency] || CURRENCIES.USD;
      },
    }),
    {
      name: "interviewforge-app-settings",
    }
  )
);
