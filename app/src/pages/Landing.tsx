import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import api from '../services/api';

import '../styles/pages/landing.css';

interface Item {
    id: number;
    product: {
        id: number;
        name: string;
        unitPrice: number;
        multiple: number;
    };
    amount: number;
    unitPrice: number;
    profitability: string;
}

interface Order {
    id: number;
    client: {
        id: number;
        name: string;
    };
    items: Item[];
}

function Landing() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('orderRequest').then(response => {
            setOrders(response.data);
        });
    }, []);
    
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <main>
                <h1>Emissão de Pedidos</h1>
                <p>Abaixo, os pedidos já existentes:</p>
                </main>

                <table>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.client.name}</td>
                                    <td><a href="https://www.google.com">Atualizar</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Link to="/order/create" className="create-order">
                  <FiPlus size={32} className="add"/>
                  <p>Novo pedido</p>
                </Link>
            </div>
        </div>
    ); 
}

export default Landing;