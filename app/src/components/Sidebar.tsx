import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/components/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <Link to="/" className="go">
        <FiArrowLeft size={24} className="back"/>
      </Link>
    </aside>
  );
}