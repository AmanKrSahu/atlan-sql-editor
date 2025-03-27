"use client";

import { Bell, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "@/app/(root)/_styles/navbar.module.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (!isMounted) return;

    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const ThemeIcon = darkMode ? Sun : Moon;

  if (!isMounted) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/images/logo/logo.svg"
          alt="SQL Editor Logo"
          width={32}
          height={32}
          priority
        />
        <p>SQL Editor</p>
      </div>
      <div className={styles.icons}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          <ThemeIcon size={20} />
        </button>
        <Bell className={styles.icon} aria-hidden="true" />
        <Settings className={styles.icon} aria-hidden="true" />
        <div className={styles.avatar}>
          <Image
            src="/images/avatars/female-avatar.png"
            alt="User avatar"
            width={32}
            height={32}
            priority
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
