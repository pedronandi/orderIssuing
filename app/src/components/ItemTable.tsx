import React from "react";
import { useTable, Column, useSortBy } from "react-table";

import { Data } from '../interfaces/Data';

import '../styles/components/item-table.css';

/* https://codesandbox.io/s/997mn?file=/src/index.tsx:261-269 */

const columns: Column<Data>[] = [
  {
    Header: "Produto",
    accessor: "product"
  },
  {
    Header: "Quantidade",
    accessor: "amount"
  },
  {
    Header: "Preço Unitário",
    accessor: "unitPrice"
  },
  {
    Header: "Rentabilidade",
    accessor: "profitability"
  }
];

interface ItemTableProps {
  data: Data[];
}

export default function ItemTable(props: ItemTableProps) {
  const{data} = props;
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<Data>({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td{...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};