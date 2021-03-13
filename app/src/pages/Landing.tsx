import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import Table from '../components/Table';

import '../styles/pages/landing.css';

const stockItems = [
    {
      id: 1,
      name: "Darth Vader",
      update: {
        name: "Atualizar",
        link: "https://www.google.com"
      }
    },
    {
      id: 2,
      name: "Obi-wan",
      update: {
        name: "Atualizar",
        link: "https://www.google.com"
      }
    }
];    

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <main>
                <h1>Emissão de Pedidos</h1>
                <p>Abaixo, os pedidos já existentes:</p>
                </main>

                <Table
                    headers={{
                    id: "Pedido",
                    name: "Cliente",
                    update: "Ação"
                    }}
                    items={stockItems}
                    customRenderers={{
                        update: (it) => (
                            <a
                            href={`${it.update.link}`}
                            >{`${it.update.name}`}</a>
                        )
                    }}
                />

                <Link to="/order/create" className="create-order">
                  <FiPlus size={32} className="add"/>
                  <p>Novo pedido</p>
                </Link>
            </div>
        </div>
    ); 
}

export default Landing;