import React, { ChangeEvent, useMemo } from "react";
import { useTable, Column, useSortBy, Row } from "react-table";

import DropDown from '../components/DropDown';

import { Data } from '../interfaces/Data';
import { Product } from '../interfaces/Product';

import '../styles/components/item-table.css';

/* 
  https://codesandbox.io/s/997mn?file=/src/index.tsx:261-269 
  https://cloudnweb.dev/2020/08/how-to-build-an-actionable-data-table-with-react-table-and-tailwindcss/
  https://retool.com/blog/building-a-react-table-component/
*/

interface ItemTableProps {
  products: Product[];
  data: Data[];
}

export default function ItemTable(props: ItemTableProps) {
  const{products, data} = props;

  const columns: Column<Data>[] = useMemo(() => {
    function handleProductChange(row: Row<Data>, productIndex: number) {
      const index: number = ((row.id as any) as number);
      data[index].product = products[productIndex];
      data[index].unitPrice = products[productIndex].unitPrice;
      console.log(data);
    }

    /*function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      console.log(event.target.value);
    }*/

    return [
      {
        Header: "Produto",
        accessor: "product",
        Cell: ({ cell: { row } }) => (
          <DropDown options={products} onDropDownChange={handleProductChange.bind(null, row)}/>
        )
      },
      {
        Header: "Quantidade",
        accessor: "amount",
        /*Cell: ({ cell: { value } }) => (
          <input value={value} onChange={handleInputChange} className="editable-input"/>
        )*/
      },
      {
        Header: "Preço Unitário",
        accessor: "unitPrice",
        /*Cell: ({ cell: { row } }) => (
          <input value={data[((row.id as any) as number)].unitPrice} onChange={handleInputChange} className="editable-input"/>
        )*/
      },
      {
        Header: "Rentabilidade",
        accessor: "profitability"
      }
    ]
  }, [
    products,
    data
  ]);
  
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