'use client';
import React, { useState } from 'react';
import ThemeProvider from '@/components/theme-provider';
import Switch from '@/components/switch';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  // Function to toggle theme
  const handleToggleTheme = (value: boolean) => {
    setIsDark(value);
  };

  return (
    <>
      <div className="absolute z-40">
        <Switch onToggle={handleToggleTheme} />
      </div>

      <ThemeProvider isDark={isDark}>{children}</ThemeProvider>
    </>
  );
};

export default ThemeProviderWrapper;
