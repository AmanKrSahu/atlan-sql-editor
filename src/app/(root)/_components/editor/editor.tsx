"use client";

import { useState } from "react";

import styles from "@/app/(root)/_styles/editor.module.css";
import { useTheme } from "@/app/providers/theme-provider";

import ControlBar from "./control-bar";
import EmptyEditorState from "./empty-state";
import SQLEditor from "./sql-editor";
import TabBar from "./tab-bar";

interface Tab {
  id: string;
  title: string;
  language: string;
  value: string;
}

const SQLQueryEditor = () => {
  const { darkMode } = useTheme();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [queryName, setQueryName] = useState("");

  const createNewTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: `Query ${tabs.length + 1}`,
      language: "sql",
      value: "-- Write your SQL query here\nSELECT * FROM categories;",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setQueryName("");
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);

    if (activeTabId === id) {
      setActiveTabId(
        newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null,
      );
    }
  };

  const updateTabValue = (id: string, value: string | undefined) => {
    setTabs(
      tabs.map(tab => (tab.id === id ? { ...tab, value: value || "" } : tab)),
    );
  };

  const handleRunQuery = () => {
    console.log(
      "Running query:",
      tabs.find(tab => tab.id === activeTabId)?.value,
    );
  };

  const handleSaveQuery = () => {
    if (!queryName.trim()) return;
    console.log(
      "Saving query:",
      queryName,
      tabs.find(tab => tab.id === activeTabId)?.value,
    );
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className={styles.editorContainer}>
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        onTabClose={closeTab}
        onNewTab={createNewTab}
      />

      <ControlBar
        queryName={queryName}
        onQueryNameChange={setQueryName}
        onRunQuery={handleRunQuery}
        onSaveQuery={handleSaveQuery}
        hasActiveTab={!!activeTabId}
      />

      <div className={styles.editorArea}>
        {activeTab ? (
          <SQLEditor
            key={`${activeTabId}-${darkMode ? "dark" : "light"}`}
            language={activeTab.language}
            value={activeTab.value}
            darkMode={darkMode}
            onChange={value =>
              activeTabId && updateTabValue(activeTabId, value)
            }
          />
        ) : (
          <EmptyEditorState />
        )}
      </div>
    </div>
  );
};

export default SQLQueryEditor;
