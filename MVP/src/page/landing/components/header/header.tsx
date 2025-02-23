import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./header.css"
import { useEffect, useState } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrolled = window.scrollY > 0;
        if (scrolled !== isScrolled) {
          setIsScrolled(scrolled);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isScrolled]);
  return (
    <header className={`p-3 bg-gray-200 header ${isScrolled ? 'scrolled' : ''}`}>
      <h2 className='text-center color-white'>
        CouncilIA
      </h2>
    </header>
  );
}

