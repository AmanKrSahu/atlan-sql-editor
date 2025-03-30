"use client";

import { Bell, CircleHelp } from "lucide-react";
import Image from "next/image";

import styles from "@/app/(root)/_styles/navbar.module.css";
import { useTheme } from "@/app/providers/theme-provider";

const Navbar = () => {
  const { darkMode, toggleTheme, ThemeIcon } = useTheme();

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
        <CircleHelp className={styles.icon} aria-hidden="true" />
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
