import React, { useState, useEffect, FormEvent } from "react";
import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import DropDown from '../components/DropDown';
import ItemTable from "../components/ItemTable";

import { Data } from '../interfaces/Data';
import { Client } from '../interfaces/Client';
import { Product } from '../interfaces/Product';

import api from '../services/api';

import '../styles/pages/create-order.css';

export default function CreateOrder() {
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>();
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setRowData] = useState<Data[]>([]);

  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('product').then(response => {
      /*var productsRetrieved: Option[] = [];
      
      response.data.forEach((element: any) => {
        productsRetrieved = [
          ...productsRetrieved,
          {
            id: element.id,
            name: element.name
          }
        ]
      });

      setProducts(productsRetrieved);*/
      setProducts(response.data);
    });
  }, []);

  function handleClientChange(index: number) {
    setClient(clients[index]);
  }

  /*function handleProductChange(index: number) {
    setProduct(products[index]);
  }*/

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const onAddRowClick = () => {
    const item: Data = {
      products: products,
      amount: undefined,
      unitPrice: undefined,
      profitability: ""
    };
    
    setRowData(data.concat(item));
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
                {/*<DropDown options={products} onDropDownChange={handleProductChange}/>*/}
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