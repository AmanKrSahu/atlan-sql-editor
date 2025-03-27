"use client";

import { Editor } from "@monaco-editor/react";

import styles from "@/app/(root)/_styles/editor.module.css";

interface SQLEditorProps {
  language: string;
  value: string;
  darkMode: boolean;
  onChange: (value: string | undefined) => void;
}

const SQLEditor = ({ language, value, darkMode, onChange }: SQLEditorProps) => (
  <Editor
    language={language}
    value={value}
    theme={darkMode ? "vs-dark" : "light"}
    options={{
      minimap: { enabled: false },
      fontSize: 14,
      wordWrap: "on",
      automaticLayout: true,
      scrollbar: {
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0,
        alwaysConsumeMouseWheel: false,
      },
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      scrollBeyondLastLine: false,
    }}
    onChange={onChange}
    loading={<div className={styles.emptyState}>Loading editor...</div>}
  />
);

export default SQLEditor;
