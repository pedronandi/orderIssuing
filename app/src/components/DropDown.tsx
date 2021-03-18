import React, { ChangeEvent } from 'react';

import '../styles/components/drop-down.css';

interface DropDownProps {
  options: any[];
  onDropDownChange: any;
}

export default function DropDown(props: DropDownProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    props.onDropDownChange(event.target.value);
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