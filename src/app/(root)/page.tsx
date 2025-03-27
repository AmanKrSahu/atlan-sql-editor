import styles from "@/app/(root)/_styles/page.module.css";

import MainLayout from "./_components/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Atlan SQL Editor</h1>
      </div>
    </MainLayout>
  );
}
