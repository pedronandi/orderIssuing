import React, { ChangeEvent, useEffect, useState } from 'react';

import { Product } from '../interfaces/Product';
import api from '../services/api';

import '../styles/components/drop-down.css';

interface ProductDropDownProps {
  defaultId:number;
  onDropDownChange:any;
}

function getDefaultIndex(products: Product[], defaultId:number) {
  const index:number = products.map((product) => {
    return product.id;
  }).indexOf(defaultId);
  
  return index;
}

export default function ProductDropDown(props: ProductDropDownProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [defaultIndex, setDefaultIndex] = useState<number>();
  
  useEffect(() => {
    api.get('product').then(response => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    setDefaultIndex(getDefaultIndex(products, props.defaultId));
  }, [products, props.defaultId]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const index:number = ((event.target.value as any) as number);
    const selectedProduct:Product = products[index];
    setDefaultIndex(index);
    props.onDropDownChange(selectedProduct);
  }

  return (
    <select value={defaultIndex} onChange={handleChange}>
      <option value='default' disabled>Escolha um produto</option>
      {products.map((product, index) => {
        return (
          <option
            key={index}
            value={index}
          >
            {product.name}
          </option>
        );
      })}
    </select>
  );
}