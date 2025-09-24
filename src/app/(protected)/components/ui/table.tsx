import React from "react";

interface TableProps {
  columns: string[];
  data: Array<Record<string, any>>;
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="w-full border border-gray-200 rounded">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="border px-3 py-2 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="even:bg-gray-50">
            {columns.map((col) => (
              <td key={col} className="border px-3 py-2">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
