import React, { useState, useEffect, FormEvent } from "react";
import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import DropDown from '../components/DropDown';
import ItemTable from "../components/ItemTable";

import { Option } from '../interfaces/Option';
import { Data } from '../interfaces/Data';

import api from '../services/api';

import '../styles/pages/create-order.css';

export default function CreateOrder() {
  const [clients, setClients] = useState<Option[]>([]);
  const [client, setClient] = useState<Option>();
  const [data, setRowData] = useState<Data[]>([]);
  const [products, setProducts] = useState<Option[]>([]);
  const [product, setProduct] = useState<Option>();

  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('product').then(response => {
      var productsRetrieved: Option[] = [];
      
      response.data.forEach((element: any) => {
        productsRetrieved = [
          ...productsRetrieved,
          {
            id: element.id,
            name: element.name
          }
        ]
      });

      setProducts(productsRetrieved);
    });
  }, []);

  function handleClientChange(index: number) {
    setClient(clients[index]);
  }

  function handleProductChange(index: number) {
    setProduct(products[index]);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  /*teste*/
  
  const onAddRowClick = () => {
    const item: Data = {
      product: "",
      amount: 0,
      unitPrice: 0,
      profitability: ""
    };
    
    setRowData(
      data.concat(item)
    )
  }

  return (
    <div id="page-create-order">
      <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-order-form">
          <fieldset>
              <legend>Novo Pedido</legend>

              <div className="input-block">
                <label htmlFor="client">Cliente</label>
                <DropDown options={clients} onDropDownChange={handleClientChange}/>
                <label htmlFor="items">Itens</label>
                <DropDown options={products} onDropDownChange={handleProductChange}/>
                <button onClick={onAddRowClick} className="add-item">
                  <FiPlus size={20} className="add-item-logo"/>
                  Adicionar Item
                </button>
                <ItemTable data={data}/>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}