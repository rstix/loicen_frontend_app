// import { useState, useEffect } from 'react';
'use client';
import Link from 'next/link';

interface ScrolLinkProps {
  id: string;
  children: React.ReactNode;
}

const ScrolLink = ({ id, children }: ScrolLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer font-semibold self-center"
    >
      {children}
    </div>
  );
};

export default ScrolLink;
