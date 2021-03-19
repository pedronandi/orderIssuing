import React, { useEffect, useState, FormEvent } from "react";
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import ClientDropDown from '../components/ClientDropDown';
import ItemTable from "../components/ItemTable";

import { Order } from '../interfaces/Order';
import { Client } from '../interfaces/Client';
import api from '../services/api';

import '../styles/pages/update-order.css';

interface OrderParams {
  id:string;
}

export default function UpdateOrder() {
  const params = useParams<OrderParams>();
  const [order, setOrder] = useState<Order>();
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    api.get(`orderRequest/${params.id}`).then(response => {
      setOrder(response.data);
    })
  }, [params.id]);

  if (!order) {
    return <p>Carregando o pedido...</p>;
  }

  function handleClientChange(client:Client) {
    setClient(client);
  }

  async function handleSubmit(event:FormEvent) {
    event.preventDefault();
  }

  return(
    <div id="page-update-order">
      <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="update-order-form">
          <fieldset>
              <legend>Atualizar Pedido Nº {params.id}</legend>

              <div className="input-block">
                <label htmlFor="client">Cliente</label>
                <ClientDropDown defaultId={order.client.id} onDropDownChange={handleClientChange}/>
                <label htmlFor="items">Itens</label>
                <ItemTable items={order.items}/>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}  