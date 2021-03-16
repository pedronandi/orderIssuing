import React, { ChangeEvent } from 'react';

import '../styles/components/drop-down.css';

interface Option {
  id: number;
  name: string;
}

interface DropDownProps {
  options: Option[];
}

export default function DropDown(props: DropDownProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    console.log(props.options[event.target.value as any]);
  }

  return (
    <select onChange={handleChange}>
      {props.options.map((option, index) => {
        return (
          <option
            key={index}
            value={index}
          >
            {option.name}
          </option>
        );
      })}
    </select>
  );
}