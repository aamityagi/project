"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info, Settings, FileDown, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import KeywordFilter, {
  MatchType,
  KeywordType,
} from "./DataTable-Filter/KeywordFilter";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FilterDropdown from "../components/DataTable-Filter/FilterDropdown";
import Image from "next/image";

export interface TableRow {
  [key: string]: string | number | boolean | Date | undefined;
  MatchType?: string; // for filter logic
}

interface DynamicTableProps {
  data: TableRow[];
}

const defaultColumns = [
  "Keyword",
  "Intent",
  "Volume",
  "KD",
  "CPC",
  "SF",
  "UpdateDate",
];

export default function DynamicTable({ data }: DynamicTableProps) {
  const [visibleCols, setVisibleCols] = useState<string[]>(defaultColumns);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState(false);
  const columnsDropdownRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [keywordType, setKeywordType] = useState<KeywordType>("All");
  const [matchType, setMatchType] = useState<MatchType>("All Keyword");
  const [volumeFilter, setVolumeFilter] = useState<
    string | { from: number; to: number } | null
  >(null);
  const [kdFilter, setKdFilter] = useState<
    string | { from: number; to: number } | null
  >(null);
  const [intentFilter, setIntentFilter] = useState<string[]>([]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnsDropdownRef.current &&
        !columnsDropdownRef.current.contains(event.target as Node)
      ) {
        setColumnsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!data || data.length === 0)
    return <p className="text-center mt-4">No data found</p>;

  const allColumns = Array.from(
    new Set(data.flatMap((row) => Object.keys(row)))
  );

  const toggleCol = (col: string) => {
    if (col === "Keyword") return;
    setVisibleCols((prev) => {
      if (prev.includes(col)) {
        // Remove the column
        return prev.filter((c) => c !== col);
      } else {
        // Add column but keep original order
        return defaultColumns.filter(
          (c) => c === "Keyword" || prev.includes(c) || c === col
        );
      }
    });
  };

  const toggleRow = (idx: number) => {
    const copy = new Set(selectedRows);
    if (copy.has(idx)) {
      copy.delete(idx);
    } else {
      copy.add(idx);
    }
    setSelectedRows(copy);
  };

  const handleSort = (col: string) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const handleFilterChange = (kType: KeywordType, mType: MatchType) => {
    setKeywordType(kType);
    setMatchType(mType);
    setPage(1);
  };

  const filteredData = data.filter((row) => {
    // Keyword type filter
    if (keywordType === "Questions") {
      const keyword = row.Keyword?.toString().toLowerCase() || "";
      if (
        !keyword.startsWith("how") &&
        !keyword.startsWith("what") &&
        !keyword.startsWith("why") &&
        !keyword.endsWith("?")
      )
        return false;
    }

    // Match type filter
    // Match type filter
    switch (matchType) {
      case "Broad Match":
        if (row.MatchType !== "Broad Match") return false;
        break;
      case "Phrase Match":
        if (row.MatchType !== "Phrase Match") return false;
        break;
      case "Exact Match":
        if (row.MatchType !== "Exact Match") return false;
        break;
      case "Related":
        if (row.MatchType !== "Related") return false;
        break;
    }

    // Volume filter
    if (volumeFilter) {
      const volumeValue = row.Volume as number;
      if (typeof volumeFilter === "string" && volumeFilter !== "custom") {
        // parse predefined ranges like "101-1000" or single value
        const [min, max] = volumeFilter.includes("-")
          ? volumeFilter.split("-").map(Number)
          : [Number(volumeFilter), Number.MAX_SAFE_INTEGER];

        // ensure max does not exceed table data max
        const tableMax = Math.max(
          ...data.map((d) => (d.Volume as number) || 0)
        );
        const adjustedMax = Math.min(max, tableMax);

        if (volumeValue < min || volumeValue > adjustedMax) return false;
      } else if (typeof volumeFilter === "object") {
        // custom range from the user
        const from = volumeFilter.from;
        const to = volumeFilter.to;

        // make sure to cap max to table max
        const tableMax = Math.max(
          ...data.map((d) => (d.Volume as number) || 0)
        );
        const adjustedTo = Math.min(to, tableMax);

        if (volumeValue < from || volumeValue > adjustedTo) return false;
      }
    }

    // KD filter
    if (kdFilter) {
      if (typeof kdFilter === "string" && kdFilter !== "custom") {
        const [min, max] = kdFilter.split("-").map(Number);
        if ((row.KD as number) < min || (row.KD as number) > max) return false;
      } else if (typeof kdFilter === "object") {
        if (
          (row.KD as number) < kdFilter.from ||
          (row.KD as number) > kdFilter.to
        )
          return false;
      }
    }

    // Intent filter
    if (intentFilter.length > 0 && !intentFilter.includes(row.Intent as string))
      return false;

    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortCol) return 0;
    const valA = a[sortCol];
    const valB = b[sortCol];
    if (valA == null) return 1;
    if (valB == null) return -1;
    if (typeof valA === "number" && typeof valB === "number") {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const pagedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportExcel = () => {
    const exportData = (
      selectedRows.size
        ? Array.from(selectedRows).map((i) => sortedData[i])
        : sortedData
    ).map((row) =>
      visibleCols.reduce((acc, col) => {
        acc[col] = row[col];
        return acc;
      }, {} as TableRow)
    );
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  const exportPDF = async () => {
    const input = document.getElementById("table-container");
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("table.pdf");
  };
  // Info Icon Information
  const columnInfo: Record<string, string> = {
    KD: "KD means Keyword Difficulty. It indicates how hard it is to rank for this keyword. Factors include competition, backlinks, and content quality.",
    Volume:
      "Volume indicates the estimated monthly search traffic for this keyword.",
    CPC: "CPC is the average cost per click if you run an ad for this keyword.",
    SF: "SF shows the number of search results or pages competing for this keyword.",
    Intent:
      "Intent indicates user intent: Informational, Navigational, Commercial, or Transactional.",
    UpdateDate:
      "UpdateDate shows when this keyword data was last updated (format: dd/mm/yyyy).",
    Keyword: "Keyword is the search term that users are looking for.",
  };

  return (
    <div>
      {/* Filter Component */}
      <KeywordFilter
        keywordType={keywordType}
        matchType={matchType}
        onFilterChange={handleFilterChange}
      />

      <div className="flex gap-2 mb-2">
        <FilterDropdown
          title="Volume"
          type="single"
          options={[
            { label: "100,001+", value: "100001+" },
            { label: "10,001–100,000", value: "10001-100000" },
            { label: "1,001–10,000", value: "1001-10000" },
            { label: "101–1,000", value: "101-1000" },
            { label: "11–100", value: "11-100" },
            { label: "1–10", value: "1-10" },
          ]}
          onApply={(value) => {
            setVolumeFilter(value);
            setPage(1);
          }}
        />

        <FilterDropdown
          title="KD"
          type="single"
          options={[
            {
              label: "Very hard",
              value: "85-100",
              range: "85–100%",
              tooltip: "Extremely difficult, highly competitive keywords",
            },
            {
              label: "Hard",
              value: "70-84",
              range: "70–84%",
              tooltip: "Hard competition, strong SEO needed",
            },
            {
              label: "Difficult",
              value: "50-69",
              range: "50–69%",
              tooltip: "Moderately competitive keywords",
            },
            {
              label: "Possible",
              value: "30-49",
              range: "30–49%",
              tooltip: "Possible to rank with good SEO strategy",
            },
            {
              label: "Easy",
              value: "15-29",
              range: "15–29%",
              tooltip: "Relatively easy to rank",
            },
            {
              label: "Very easy",
              value: "0-14",
              range: "0–14%",
              tooltip: "Very low competition keywords",
            },
          ]}
          onApply={(value) => {
            setKdFilter(value);
            setPage(1);
          }}
        />
        <FilterDropdown
          title="Intent"
          type="multi"
          options={[
            { label: "Informational" },
            { label: "Navigational" },
            { label: "Commercial" },
            { label: "Transactional" },
          ]}
          onApply={(value) => {
            setIntentFilter(value || []); // store selected intents
            setPage(1);
          }}
        />
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p>
          All Keywords: {filteredData.length} | Selected: {selectedRows.size}
        </p>
        <div className="flex gap-2">
          {/* Columns Dropdown */}
          <div ref={columnsDropdownRef} className="relative">
            <Button
              size="sm"
              className="shadow-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-800 hover:text-gray-100"
              onClick={() => setColumnsDropdownOpen(!columnsDropdownOpen)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            {columnsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md z-50">
                {allColumns.map((col) => (
                  <div
                    key={col}
                    className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 ${
                      col === "Keyword" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => toggleCol(col)}
                  >
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col)}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className={col === "Keyword" ? "font-bold" : ""}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="shadow-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-800 hover:text-gray-100"
                size="sm"
              >
                <FileDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={exportExcel}>
                <FileDown className="w-4 h-4 mr-1" /> Excel
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={exportPDF}>
                <FileDown className="w-4 h-4 mr-1" /> PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Start table */}
      <div
        id="table-container"
        className="overflow-x-auto text-sm max-h-[500px] overflow-y-scroll relative"
      >
        <div className="overflow-x-auto shadow-lg border border-gray-300">
          <table className="min-w-full border-collapse text-gray-700 bg-gray-50">
            {/* Table Head */}
            <thead className="sticky top-0 bg-gray-200 z-10 shadow-sm">
              <tr>
                <th className="p-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedRows(new Set(data.map((_, i) => i)))
                        : setSelectedRows(new Set())
                    }
                    className="accent-blue-500 w-4 h-4"
                  />
                </th>
                {visibleCols.map((col) => (
                  <th
                    key={col}
                    className="p-3 border-b border-gray-200 text-left cursor-pointer select-none"
                    onClick={() => handleSort(col)}
                  >
                    <div className="flex items-center gap-1">
                      {col}
                      <ArrowUpDown className="w-3 h-3 text-gray-500" />
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {pagedData.map((row, idx) => {
                const globalIdx = (page - 1) * rowsPerPage + idx;
                const isSelected = selectedRows.has(globalIdx);

                return (
                  <tr
                    key={idx}
                    className={`
                      transition-all duration-200
                      ${
                        isSelected
                          ? "bg-blue-100 shadow-inner"
                          : "hover:bg-gray-100"
                      }
                      ${
                        isSelected
                          ? "font-semibold text-gray-800"
                          : "text-gray-700"
                      }
                      ${isSelected ? "scale-[1.01]" : ""}
                    `}
                  >
                    <td className="p-2 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(globalIdx)}
                        className="accent-blue-500 w-4 h-4"
                      />
                    </td>

                    {visibleCols.map((col) => {
                      if (col === "KD") {
                        const kdValue = row[col] as number | undefined;
                        let color = "bg-gray-300";

                        if (kdValue !== undefined && kdValue !== null) {
                          if (kdValue >= 85) color = "bg-red-800";
                          else if (kdValue >= 70) color = "bg-red-500";
                          else if (kdValue >= 50) color = "bg-orange-500";
                          else if (kdValue >= 30) color = "bg-yellow-400";
                          else if (kdValue >= 15) color = "bg-green-300";
                          else color = "bg-green-700";
                        }

                        return (
                          <td
                            key={col}
                            className="p-2 border-b border-gray-200"
                          >
                            <div className="flex items-center justify-between">
                              <span>{kdValue ?? "—"}</span>
                              <span
                                className={`w-3 h-3 rounded-full ${color}`}
                              ></span>
                            </div>
                          </td>
                        );
                      }

                      if (col === "UpdateDate") {
                        const dateValue = row[col]
                          ? new Date(row[col] as string | Date)
                          : null;
                        const formattedDate = dateValue
                          ? `${String(dateValue.getDate()).padStart(
                              2,
                              "0"
                            )}/${String(dateValue.getMonth() + 1).padStart(
                              2,
                              "0"
                            )}/${dateValue.getFullYear()}`
                          : "—";
                        return (
                          <td
                            key={col}
                            className="p-2 border-b border-gray-200"
                          >
                            {formattedDate}
                          </td>
                        );
                      }

                      return (
                        <td key={col} className="p-2 border-b border-gray-200">
                          {row[col]?.toString() ?? "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/* Table Footer */}
            <tfoot className="bg-gray-200 font-medium text-gray-700 sticky bottom-0 shadow-inner">
              <tr>
                <td
                  className="p-3 border-t border-gray-200"
                  colSpan={visibleCols.length + 1}
                >
                  Showing {pagedData.length} of {data.length} entries
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Show Related Data Not Found below the table */}
      {pagedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <Image
            src="/no-data.png" // Replace with your image path
            alt="No Data"
            className="w-24 h-24 mb-4 opacity-50"
            width={200}
            height={200}
          />
          <span className="text-lg font-semibold text-gray-500">
            Related data not found
          </span>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2">
        <div>
          Rows per page:
          <select
            className="ml-2 border p-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="mx-2">
            {page} / {totalPages}
          </span>
          <Button
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
