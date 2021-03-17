import React, { useState, useEffect, FormEvent } from "react";

import Sidebar from '../components/Sidebar';
import DropDown from '../components/DropDown';

import api from '../services/api';

import '../styles/pages/create-order.css';

interface Option {
  id: number;
  name: string;
}

export default function CreateOrder() {
  const [clients, setClients] = useState<Option[]>([]);
  const [client, setClient] = useState<Option>();
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
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}