"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface CurrencySelectorProps {
  baseCurrency?: string; // default USD
  onCurrencyChange?: (currency: string, rate: number) => void;
}

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  INR: "🇮🇳",
  AUD: "🇦🇺",
  CAD: "🇨🇦",
  JPY: "🇯🇵",
};

const CURRENCIES = Object.keys(CURRENCY_FLAGS);

export default function CurrencySelector({
  baseCurrency = "USD",
  onCurrencyChange,
}: CurrencySelectorProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>(baseCurrency);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  // Fetch exchange rate from server
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          `/api/currency?base=${baseCurrency}&symbols=${selectedCurrency}`
        );
        const data = await res.json();
        const rate = data.rates?.[selectedCurrency] || 1;
        setExchangeRate(rate);
        if (onCurrencyChange) onCurrencyChange(selectedCurrency, rate);
      } catch (err) {
        console.error("Failed to fetch exchange rate", err);
      }
    };
    fetchRate();
  }, [baseCurrency, selectedCurrency, onCurrencyChange]);

  return (
    <div className="w-40">
      <Select
        value={selectedCurrency}
        onValueChange={(value) => setSelectedCurrency(value)}
      >
        <SelectTrigger className="border px-2 py-1 flex items-center gap-1">
          <span>{CURRENCY_FLAGS[selectedCurrency]}</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="text-gray-800">
          {CURRENCIES.map((cur) => (
            <SelectItem
              key={cur}
              value={cur}
              className="flex items-center gap-2"
            >
              <span>{CURRENCY_FLAGS[cur]}</span>
              <span>{cur}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
