import React from "react";

interface Columna<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface TablaProps<T> {
  data: T[];
  columns: Columna<T>[];
}

export function Tabla<T>({ data, columns }: TablaProps<T>) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col, cidx) => (
              <td key={cidx}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}