import React, { ChangeEvent, useEffect, useState } from 'react';

import { Client } from '../interfaces/Client';
import api from '../services/api';

import '../styles/components/drop-down.css';

interface ClientDropDownProps {
  defaultId:number | null;
  onDropDownChange:any;
}

function getDefaultIndex(clients: Client[], defaultId:number) {
  if(defaultId == null) {
    return 'default';
  } else {
    const index:number = clients.map((client) => {
      return client.id;
    }).indexOf((defaultId as any) as number);
    
    return ((index as any) as string);
  }
}

export default function ClientDropDown(props: ClientDropDownProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [defaultIndex, setDefaultIndex] = useState<string>();
  
  useEffect(() => {
    api.get('client').then(response => {
      setClients(response.data);
    });
  }, []);

  useEffect(() => {
    setDefaultIndex(getDefaultIndex(clients, props.defaultId!));
  }, [clients, props.defaultId]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const index:number = ((event.target.value as any) as number);
    const selectedClient:Client = clients[index];
    setDefaultIndex(((index as any) as string));
    props.onDropDownChange(selectedClient);
  }

  return (
    <select value={defaultIndex} onChange={handleChange}>
      <option value='default' disabled>Escolha um cliente</option>
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