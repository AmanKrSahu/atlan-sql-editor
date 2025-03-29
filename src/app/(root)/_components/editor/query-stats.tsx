"use client";

import { CheckCircle2, Clock, Database } from "lucide-react";

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
    </div>
  );
};
