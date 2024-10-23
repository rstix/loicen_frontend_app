'use client';
import React, { useState } from 'react';

interface SwitchProps {
  onToggle: (value: boolean) => void;
}

const Switch = ({ onToggle }: SwitchProps) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onToggle(newValue);
  };

  return (
    <button className="text-txt" onClick={handleToggle}>
      {isOn ? 'LIGHT' : 'DARK'}
    </button>
  );
};

export default Switch;
