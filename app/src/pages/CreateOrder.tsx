import React, { FormEvent } from "react";

import Sidebar from '../components/Sidebar';
import ClientDropDown from '../components/ClientDropDown';

import '../styles/pages/create-order.css';

export default function CreateOrder() {
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
                <ClientDropDown/>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}