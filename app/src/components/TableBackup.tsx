import React from "react";

import '../styles/components/table.css';

/* https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48 */

function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  );
}

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  function renderRow(item: T) {
    return (
      <tr key={`row-${item.id}`}>
        {objectKeys(item).map((itemProperty) => {
          const customRenderer = props.customRenderers?.[itemProperty];

          if (customRenderer) {
            return <td>{customRenderer(item)}</td>;
          }

          return (
            <td>{isPrimitive(item[itemProperty]) ? item[itemProperty] : ""}</td>
          );
        })}
      </tr>
    );
  }

  return (
    <table>
      <thead>
        {objectValues(props.headers).map((headerValue) => (
          <th>{headerValue}</th>
        ))}
      </thead>
      <tbody>{props.items.map(renderRow)}</tbody>
    </table>
  );
}