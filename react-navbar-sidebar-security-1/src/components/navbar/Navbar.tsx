"use client";
import React, { useEffect, useState } from 'react';
import styles from "./Navbar.module.scss";
import Link from 'next/link';
import { useRouterPath } from '../hooks/useRouterPath';

const Navbar = () => {
  const [ isNavbarExtended, setIsNavbarExtended ] = useState<boolean>(false);
  const { isActive } = useRouterPath();
  const INNER_WIDTH = 769;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > INNER_WIDTH && isNavbarExtended) {
        setIsNavbarExtended(false);
      }
    };
    if (window.innerWidth > INNER_WIDTH && isNavbarExtended) {
      setIsNavbarExtended(false);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavbarExtended]);

  const openLinksMenuHandler = () => {
    setIsNavbarExtended((prevResult) => !prevResult);
  }

  return (
    <>
      <header className={`${styles['navbar']} ${isNavbarExtended ? styles['navbar__extended'] : ''}`}>
        <div className={styles['navbar__title']}>
          <Link href="/"><h1>SchoolBell</h1></Link>
        </div>

        <nav className={styles['navbar__links']}>
          <Link href="/home" className={isActive('/home') ? styles.active : ''}>Home</Link>
          <Link href="/dashboard" className={isActive('/dashboard') ? styles.active : ''}>Dashboard</Link>
          <Link href="/contactus" className={isActive('/contactus') ? styles.active : ''}>Contact Us</Link>
          <Link href="/register" className={isActive('/register') ? styles.active : ''}>Register</Link>
          <Link href="/login" className={isActive('/login') ? styles.active : ''}>Login</Link>
        </nav>

        <button className={`${styles['menu-button']}`} onClick={openLinksMenuHandler}>
          <span className={`material-symbols-outlined`}>menu</span>
        </button>
      </header>
    </>
  )
};

export default Navbar;