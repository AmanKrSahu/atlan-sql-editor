import { Plus } from "lucide-react";

import styles from "@/app/(root)/_styles/editor.module.css";

const EmptyEditorState = () => (
  <div className={styles.emptyEditor}>
    <div className={styles.emptyState}>
      Create a new query tab
      <Plus className={styles.addIcon} />
    </div>
  </div>
);

export default EmptyEditorState;
