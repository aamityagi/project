import React from "react";

interface TableProps<T extends Record<string, unknown>> {
  columns: string[];
  data: T[];
}


export default function Table<T extends Record<string, unknown>>({ columns, data }: TableProps<T>) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border px-4 py-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col} className="border px-4 py-2">{row[col] as React.ReactNode}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

