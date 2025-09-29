"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Info } from "lucide-react";
import { Checkbox } from "./checkbox";
import { cn } from "../../../../../lib/utils";

interface TableProps<T extends Record<string, unknown>> {
  columns: { name: string; key: string; tooltip?: string }[];
  data: T[];
}

export default function ProfessionalTable<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelectedRows(newSet);
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <th className="px-4 py-3">
                <Checkbox
                  checked={selectedRows.size === data.length}
                  onCheckedChange={(val) => {
                    if (val) setSelectedRows(new Set(data.map((_, i) => i)));
                    else setSelectedRows(new Set());
                  }}
                />
              </th>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left relative select-none"
                >
                  <div className="flex items-center gap-2">
                    {col.name}
                    {col.tooltip && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-white cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="text-xs">
                          {col.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, rowIndex) => {
              const isSelected = selectedRows.has(rowIndex);
              return (
                <tr
                  key={rowIndex}
                  className={cn(
                    "group border-b hover:bg-gray-50 transition-colors cursor-pointer",
                    isSelected && "bg-indigo-100"
                  )}
                  onClick={() => toggleRow(rowIndex)}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRow(rowIndex)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 group-hover:text-gray-700"
                    >
                      {row[col.key] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>

          {/* Footer */}
          <tfoot>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <td
                colSpan={columns.length + 1}
                className="px-4 py-2 text-right text-sm"
              >
                Total Rows: {data.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </TooltipProvider>
  );
}
