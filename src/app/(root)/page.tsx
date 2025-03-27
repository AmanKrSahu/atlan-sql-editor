import styles from "@/app/(root)/_styles/page.module.css";

import SQLQueryEditor from "./_components/editor/editor";
import MainLayout from "./_components/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <SQLQueryEditor />
      </div>
    </MainLayout>
  );
}
