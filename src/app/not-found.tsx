import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import styles from "./styles/not-found.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.text}>
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeBtn}>
            <ArrowLeft className={styles.homeIcon} />
            Back to Home
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        If you think this is a mistake, please contact our support team.
      </footer>
    </div>
  );
}

export default NotFoundPage;
