import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import { useTable, Column, useSortBy, Row } from "react-table";

import ProductDropDown from '../components/ProductDropDown';

import { Data } from '../interfaces/Data';
import { Product } from '../interfaces/Product';

import '../styles/components/item-table.css';

interface ItemTableProps {
  items: Data[];
}

export default function ItemTable(props: ItemTableProps) {
  const [data, setData] = useState<Data[]>(props.items);

  useEffect(() => {
    setData(props.items);
  }, [props.items]);

  const columns: Column<Data>[] = useMemo(() => {
    function handleProductChange(row: Row<Data>, product: Product) {
      const index: number = ((row.id as any) as number);
      const newData:Data[] = data!;
      newData[index].product = product;
      newData[index].unitPrice = product.unitPrice;
      setData(newData);
    }

    function handleAmountChange(row: Row<Data>, event: ChangeEvent<HTMLInputElement>) {
      const index: number = ((row.id as any) as number);
      const newData:Data[] = data!;
      newData[index].amount = ((event.target.value as any) as number);
      setData(newData);
    }

    function handleUnitPriceChange(row: Row<Data>, event: ChangeEvent<HTMLInputElement>) {
      const index: number = ((row.id as any) as number);
      const newData:Data[] = data!;
      newData[index].unitPrice = ((event.target.value as any) as number);
      setData(newData);
    }

    function getTenPercentShorter(value:number) {
      return (value - (value * 0.1));
    }

    function calculateProfitability(item:Data):string {
      const inputedUnitPrice:number = ((item.unitPrice as any) as number);
      const productUnitPrive:number = ((item.product?.unitPrice as any) as number);

      if(inputedUnitPrice == null) {
        return "";
      }
      
      if(inputedUnitPrice > productUnitPrive) {
        return "ÓTIMA";
      } else {
        const minimumPriceToGoodProfitability = getTenPercentShorter(productUnitPrive);

        if(inputedUnitPrice >= minimumPriceToGoodProfitability) {
          return "BOA";
        } else {
          return "RUIM";
        }
      }
    }

    return [
      {
        Header: "Produto",
        accessor: "product",
        Cell: ({ cell: { value, row } }) => (
          <ProductDropDown defaultId={
            value! === undefined ?
            null :
            ((value!.id as any) as number)
          
          } onDropDownChange={handleProductChange.bind(null, row)}/>
        )
      },
      {
        Header: "Quantidade",
        accessor: "amount",
        Cell: ({ cell: { value, row } }) => (
          <input value={value!} onChange={handleAmountChange.bind(null, row)} className="editable-input"/>
        )
      },
      {
        Header: "Preço Unitário",
        accessor: "unitPrice",
        Cell: ({ cell: { value, row } }) => (
          <input value={value!} onChange={handleUnitPriceChange.bind(null, row)} className="editable-input"/>
        )
      },
      {
        Header: "Rentabilidade",
        accessor: "profitability",
        Cell: ({ cell: { row } }) => (
          <input value={
            calculateProfitability(data[((row.id as any) as number)])
          } className="editable-input"/>
        )
      }
    ]
  }, [data]);
  
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