"use client";

import { CheckCircle2, Clock, Database, Download } from "lucide-react";
import toast from "react-hot-toast";

import styles from "@/app/(root)/_styles/editor.module.css";

interface QueryStatsProps {
  rowCount: number;
  executionTime: number;
  runTime: Date;
}

export const QueryStats = ({
  rowCount,
  executionTime,
  runTime,
}: QueryStatsProps) => {
  const formattedExecutionTime = (executionTime / 1000).toFixed(2);
  const formattedRunTime = runTime.toLocaleString();

  const handleExport = () => {
    const toastId = toast.loading("Preparing download...");

    try {
      setTimeout(() => {
        toast.success("Download started!", { id: toastId });
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to prepare download", { id: toastId });
    }
  };

  return (
    <div className={styles.queryStatsContainer}>
      <div className={styles.statItem}>
        <span style={{ fontWeight: 700 }}>Action output:</span>
      </div>

      <div className={styles.statItemSuccess}>
        <CheckCircle2 className={styles.successIcon} />
        <span>Succeeded</span>
      </div>

      <div className={styles.statItem}>
        <Database className={styles.statIcon} />
        <span>Rows: {rowCount.toLocaleString()}</span>
      </div>

      <div className={styles.statItem}>
        <Clock className={styles.statIcon} />
        <span>Execution Time: {formattedExecutionTime} ms</span>
      </div>

      <div className={styles.statItem}>
        <span>Run At: {formattedRunTime}</span>
      </div>

      <button
        className={styles.exportButton}
        onClick={handleExport}
        disabled={rowCount === 0}
        title="Export results"
      >
        <Download className={styles.exportIcon} />
        <span>Export</span>
      </button>
    </div>
  );
};
