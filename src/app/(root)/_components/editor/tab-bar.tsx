"use client";

import { Grid2X2, Plus, X } from "lucide-react";

import styles from "@/app/(root)/_styles/editor.module.css";

interface Tab {
  id: string;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
}

const TabBar = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab,
}: TabBarProps) => (
  <div className={styles.tabBar}>
    <div className={styles.tabList}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`${styles.tabItem} ${
            activeTabId === tab.id
              ? styles.tabItemActive
              : styles.tabItemInactive
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          <Grid2X2 className={styles.icon} />
          <span className={styles.tabTitle}>{tab.title}</span>
          <X
            className={styles.closeIcon}
            onClick={e => onTabClose(tab.id, e)}
          />
        </div>
      ))}
    </div>
    <button className={styles.addTabButton} onClick={onNewTab}>
      <Plus className={styles.addIcon} />
    </button>
  </div>
);

export default TabBar;
