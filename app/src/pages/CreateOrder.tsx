import React, { FormEvent, ChangeEvent } from "react";

import Sidebar from '../components/Sidebar';
import ClientDropDown from '../components/ClientDropDown';

import '../styles/pages/create-order.css';

export default function CreateOrder() {
  const [selectedClient, setSelectedClient] = useState<Client>();
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedClient(clients[event.target.value as any]);
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
                <ClientDropDown onChange={handleChange}/>
              </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}