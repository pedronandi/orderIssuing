import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { Order } from '../interfaces/Order';
import api from '../services/api';
import reactLogo from '../assets/react.png';

import '../styles/pages/landing.css';

function Landing() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('orderRequest').then(response => {
            setOrders(response.data);
        });
    }, []);

    if (!orders) {
    return <p>Carregando os pedidos...</p>;
    }
    
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <main>
                    <section className="title">
                        <h1>Emissão de Pedidos</h1>
                        <img src={reactLogo} alt="React" className="img-logo"/>
                    </section>
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
                                    <td><Link to={"/order/update/" + order.id}>Atualizar</Link></td>
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