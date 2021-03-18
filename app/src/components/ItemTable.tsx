import React, { useMemo } from "react";
import { useTable, Column, useSortBy } from "react-table";

import DropDown from '../components/DropDown';

import { Data } from '../interfaces/Data';

import '../styles/components/item-table.css';

/* 
  https://codesandbox.io/s/997mn?file=/src/index.tsx:261-269 
  https://cloudnweb.dev/2020/08/how-to-build-an-actionable-data-table-with-react-table-and-tailwindcss/
  https://retool.com/blog/building-a-react-table-component/
*/

interface ItemTableProps {
  data: Data[];
}

export default function ItemTable(props: ItemTableProps) {
  const{data} = props;

  console.log(data);

  function handleProductChange(index: number) {
    console.log(index);
  }

  const columns: Column<Data>[] = useMemo(() => [
    {
      Header: "Produto",
      accessor: "products",
      Cell: ({ cell: { value } }) => (
        <DropDown options={value} onDropDownChange={handleProductChange}/>
      )
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
  ], []);
  
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