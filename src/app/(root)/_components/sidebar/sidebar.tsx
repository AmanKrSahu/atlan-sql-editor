"use client";

import { useCallback, useState } from "react";

import { sidebarCollection } from "@/app/(root)/_data/sidebar/sidebar-collections";
import { sidebarDatabase } from "@/app/(root)/_data/sidebar/sidebar-databases";
import { sidebarTable } from "@/app/(root)/_data/sidebar/sidebar-tables";
import styles from "@/app/(root)/_styles/sidebar.module.css";
import { useEditorStore } from "@/app/store/editor-store";

import DatabaseSwitcher from "./database-switcher";
import SidebarSection from "./sidebar-section";

type ExpandedItems = Record<string, boolean>;

const Sidebar = () => {
  const [selectedDatabase, setSelectedDatabase] = useState(
    sidebarDatabase.databases[0].name,
  );
  const [expandedTables, setExpandedTables] = useState(true);
  const [expandedCollections, setExpandedCollections] = useState(true);
  const [expandedTableItems, setExpandedTableItems] = useState<ExpandedItems>(
    {},
  );
  const [expandedCollectionItems, setExpandedCollectionItems] =
    useState<ExpandedItems>({});

  const { createNewTabWithContent } = useEditorStore();

  const toggleTableItem = useCallback((tableTitle: string) => {
    setExpandedTableItems(prev => ({
      ...prev,
      [tableTitle]: !prev[tableTitle],
    }));
  }, []);

  const toggleCollectionItem = useCallback((collectionTitle: string) => {
    setExpandedCollectionItems(prev => ({
      ...prev,
      [collectionTitle]: !prev[collectionTitle],
    }));
  }, []);

  const handleCollectionItemClick = useCallback(
    (collectionTitle: string) => {
      createNewTabWithContent(
        `-- Write your SQL query here\nSELECT * FROM ${collectionTitle.toLowerCase()};`,
      );
    },
    [createNewTabWithContent],
  );

  const renderItems = (
    items: typeof sidebarTable.tables | typeof sidebarCollection.collections,
    expandedItems: ExpandedItems,
    toggleItem: (title: string) => void,
    containerStyle: string,
    itemStyle: string,
    keyStyle: string,
    valueStyle: string,
  ) => {
    return items.map(item => (
      <div key={item.title} className={styles.sidebarItem}>
        <button
          className={styles.tableHeader}
          onClick={() => toggleItem(item.title)}
          aria-expanded={!!expandedItems[item.title]}
          aria-controls={`${item.title}-content`}
        >
          <item.icon className={styles.icon} aria-hidden="true" />
          <span className={styles.tableTitle}>{item.title}</span>
        </button>
        {expandedItems[item.title] && (
          <div
            id={`${item.title}-content`}
            className={containerStyle}
            role="region"
          >
            {Object.entries(item.items).map(([key, value]) => (
              <div
                key={key}
                className={itemStyle}
                onClick={() => handleCollectionItemClick(item.title)}
              >
                <span className={keyStyle}>{key}</span>
                <span className={valueStyle}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <aside className={styles.sidebar} aria-label="Database navigation">
      <DatabaseSwitcher
        databases={sidebarDatabase.databases}
        selectedDatabase={selectedDatabase}
        setSelectedDatabase={setSelectedDatabase}
      />
      <nav aria-label="Tables section">
        <SidebarSection
          title="TABLES"
          expanded={expandedTables}
          setExpanded={setExpandedTables}
        >
          {renderItems(
            sidebarTable.tables,
            expandedTableItems,
            toggleTableItem,
            styles.schemaContainerTables,
            styles.schemaItemTables,
            styles.schemaKeyTables,
            styles.schemaValueTables,
          )}
        </SidebarSection>
      </nav>
      <nav aria-label="Collections section">
        <SidebarSection
          title="COLLECTIONS"
          expanded={expandedCollections}
          setExpanded={setExpandedCollections}
        >
          {renderItems(
            sidebarCollection.collections,
            expandedCollectionItems,
            toggleCollectionItem,
            styles.schemaContainerCollections,
            styles.schemaItemCollections,
            styles.schemaKeyCollections,
            styles.schemaValueCollections,
          )}
        </SidebarSection>
      </nav>
    </aside>
  );
};

export default Sidebar;
