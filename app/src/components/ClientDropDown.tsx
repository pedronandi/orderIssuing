import React, { useState, useEffect } from "react";

import api from '../services/api';

import '../styles/components/client-drop-down.css';

interface Client {
  id: number;
  name: string;
}

export default function ClientDropDown() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
    });
  }, []);

  const [selectedClient, setSelectedClient] = useState<Client>();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedClient(clients[event.target.value as any]);
    console.log(selectedClient);
  }

  return (
    <select onChange={handleChange}>
      {clients.map((client, index) => {
        return (
          <option
            key={index}
            value={index}
          >
            {client.name}
          </option>
        );
      })}
    </select>
  );
}