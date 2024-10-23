'use client';
import React from 'react';

interface ThemeProviderProps {
  isDark: boolean;
  children: React.ReactNode;
}

const ThemeProvider = ({ isDark, children }: ThemeProviderProps) => {
  return <div className={isDark ? 'dark' : 'light'}>{children}</div>;
};

export default ThemeProvider;
