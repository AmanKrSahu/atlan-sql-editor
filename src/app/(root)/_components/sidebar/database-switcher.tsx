"use client";

import { Check, ChevronsUpDown, Database } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/app/(root)/_styles/sidebar.module.css";

interface Database {
  name: string;
}

interface DatabaseSwitcherProps {
  databases: Database[];
  selectedDatabase: string;
  setSelectedDatabase: (dbName: string) => void;
}

const DatabaseSwitcher = ({
  databases,
  selectedDatabase,
  setSelectedDatabase,
}: DatabaseSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

  const selectDatabase = useCallback(
    (dbName: string) => {
      setSelectedDatabase(dbName);
      setIsOpen(false);
    },
    [setSelectedDatabase],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.databaseSwitcherWrapper}>
      <div className={styles.databaseSwitcher} ref={dropdownRef}>
        <button
          ref={buttonRef}
          className={styles.switcherButton}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select database"
        >
          <Database className={styles.icon} size={16} aria-hidden="true" />
          <span>{selectedDatabase}</span>
          <ChevronsUpDown
            className={styles.icon}
            size={16}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <ul
            className={styles.dropdown}
            role="listbox"
            aria-label="Database options"
          >
            {databases.map(db => (
              <li
                key={db.name}
                className={styles.dropdownItem}
                onClick={() => selectDatabase(db.name)}
                role="option"
                aria-selected={db.name === selectedDatabase}
              >
                <span>{db.name}</span>
                {db.name === selectedDatabase && (
                  <Check
                    className={styles.icon}
                    style={{ color: "hsl(349.7 89.2% 60.2%)" }}
                    size={16}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DatabaseSwitcher;
