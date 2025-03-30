"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import categories from "@/app/(root)/_data/tables/categories.json";
import products from "@/app/(root)/_data/tables/products.json";
import shippers from "@/app/(root)/_data/tables/shippers.json";
import styles from "@/app/(root)/_styles/editor.module.css";
import { useTheme } from "@/app/providers/theme-provider";
import { useEditorStore } from "@/app/store/editor-store";

import ControlBar from "./control-bar";
import EmptyEditorState from "./empty-state";
import { QueryStats } from "./query-stats";
import SQLEditor from "./sql-editor";
import TabBar from "./tab-bar";
import { Table } from "./table";

interface QueryStatsData {
  executionTime: number | null;
  runTime: Date | null;
}

const SQLQueryEditor = () => {
  const { darkMode } = useTheme();
  const {
    tabs,
    activeTabId,
    setActiveTabId,
    setTabs,
    updateTabValue,
    createNewTab,
  } = useEditorStore();
  const [queryName, setQueryName] = useState("");
  const [queryResult, setQueryResult] = useState<
    Record<string, unknown>[] | null
  >(null);
  const [queryStats, setQueryStats] = useState<QueryStatsData>({
    executionTime: null,
    runTime: null,
  });

  useEffect(() => {
    setQueryResult(null);
    setQueryStats({
      executionTime: null,
      runTime: null,
    });
  }, [activeTabId]);

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

  const executeQuery = (query: string) => {
    const startTime = performance.now();
    const startDate = new Date();

    let result: Record<string, unknown>[] = [];
    query = query.toLowerCase().trim();

    try {
      if (query.includes("select")) {
        let tableData: Record<string, unknown>[] = [];

        if (query.includes("from categories")) {
          tableData = [...categories];
        } else if (query.includes("from products")) {
          tableData = [...products];
        } else if (query.includes("from shippers")) {
          tableData = [...shippers];
        } else {
          toast.error("Table not found");
          return {
            result: [],
            stats: {
              executionTime: performance.now() - startTime,
              runTime: startDate,
            },
          };
        }

        if (query.includes("select * from")) {
          result = [...tableData];
        } else {
          const columns = query
            .split("select")[1]
            .split("from")[0]
            .split(",")
            .map(col => col.trim());

          result = tableData.map(item => {
            const row: Record<string, unknown> = {};
            columns.forEach(col => {
              if (col in item) {
                row[col] = item[col as keyof typeof item];
              }
            });
            return row;
          });
        }

        toast.success("Query executed successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error executing query");
      result = [];
    }

    const executionTime = performance.now() - startTime;

    return {
      result,
      stats: {
        executionTime,
        runTime: startDate,
      },
    };
  };

  const handleRunQuery = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (!activeTab) return;

    const { result, stats } = executeQuery(activeTab.value);
    setQueryResult(result);
    setQueryStats(stats);
  };

  const handleSaveQuery = () => {
    if (!queryName.trim()) {
      toast.error("Please enter a query name");
      return;
    }
    toast.success("Query added to Collections!");
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
          <>
            <div className={styles.editorHeight}>
              <SQLEditor
                key={activeTabId}
                language={activeTab.language}
                value={activeTab.value}
                darkMode={darkMode}
                onChange={value =>
                  activeTabId && updateTabValue(activeTabId, value || "")
                }
              />
            </div>
            {queryResult && (
              <div className={styles.resultsContainer}>
                <QueryStats
                  rowCount={queryResult.length}
                  executionTime={queryStats.executionTime || 0}
                  runTime={queryStats.runTime || new Date()}
                />
                <Table result={queryResult} />
              </div>
            )}
          </>
        ) : (
          <EmptyEditorState />
        )}
      </div>
    </div>
  );
};

export default SQLQueryEditor;
