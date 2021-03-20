import React, { useState, FormEvent } from "react";
import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import ClientDropDown from '../components/ClientDropDown';
import ItemTable from "../components/ItemTable";

import { Client } from '../interfaces/Client';
import { Data } from '../interfaces/Data';
import { Order } from '../interfaces/Order';

import '../styles/pages/create-order.css';

export default function CreateOrder() {
  const [client, setClient] = useState<Client>();
  const [items, setItem] = useState<Data[]>([]);

  function handleClientChange(client: Client) {
    setClient(client);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    var newOrder:Order ={
      id: 1,
      client: client as Client,
      items: items as Data[]
    }

    console.log(newOrder);
  }

  const onAddRowClick = () => {
    const emptyItem: Data = {
      id: undefined,
      product: undefined,
      amount: undefined,
      unitPrice: undefined,
      profitability: undefined
    };

    setItem(items.concat(emptyItem));
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
                <ClientDropDown defaultId={null} onDropDownChange={handleClientChange}/>
                <label htmlFor="items">Itens</label>
                <button onClick={onAddRowClick} className="add-item">
                  <FiPlus size={20} className="add-item-logo"/>
                  Adicionar Item
                </button>
                <ItemTable items={items}/>
                <button onClick={handleSubmit} className="add-item">
                  <FiPlus size={20} className="add-item-logo"/>
                  Criar Pedido
                </button>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}