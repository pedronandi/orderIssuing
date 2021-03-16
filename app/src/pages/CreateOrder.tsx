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
                <DropDown options={clients}/>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}