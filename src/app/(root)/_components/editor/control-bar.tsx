"use client";

import { Play, Save } from "lucide-react";

import styles from "@/app/(root)/_styles/editor.module.css";

interface ControlBarProps {
  queryName: string;
  onQueryNameChange: (value: string) => void;
  onRunQuery: () => void;
  onSaveQuery: () => void;
  hasActiveTab: boolean;
}

const ControlBar = ({
  queryName,
  onQueryNameChange,
  onRunQuery,
  onSaveQuery,
  hasActiveTab,
}: ControlBarProps) => (
  <div className={styles.controlBar}>
    <div className={styles.inputButton}>
      <span>SELECT</span>
      <input
        type="text"
        placeholder="Enter the name of the query"
        className={styles.queryNameInput}
        value={queryName}
        onChange={e => onQueryNameChange(e.target.value)}
        disabled={!hasActiveTab}
      />
    </div>
    <div className={styles.controlButtons}>
      <button
        className={styles.runButton}
        onClick={onRunQuery}
        disabled={!hasActiveTab}
      >
        <Play className={styles.controlIcon} />
        Run Query
      </button>
      <button
        className={styles.saveButton}
        onClick={onSaveQuery}
        disabled={!hasActiveTab || !queryName.trim()}
      >
        <Save className={styles.controlIcon} />
        Save Query
      </button>
    </div>
  </div>
);

export default ControlBar;
