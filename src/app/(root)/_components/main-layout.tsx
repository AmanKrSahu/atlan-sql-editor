import styles from "@/app/(root)/_styles/layout.module.css";

import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
