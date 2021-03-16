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
  
  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
    });
  }, []);

  const [client, setClient] = useState<Option>();

  function handleClientChange(index: number) {
    setClient(clients[index]);
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

                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Unitário</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}