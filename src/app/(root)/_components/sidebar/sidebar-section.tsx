import { ChevronDown, ChevronRight, Share2 } from "lucide-react";
import { memo } from "react";

import styles from "@/app/(root)/_styles/sidebar.module.css";

interface SidebarSectionProps {
  title: string;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  children: React.ReactNode;
}

const SidebarSection = memo(
  ({ title, expanded, setExpanded, children }: SidebarSectionProps) => {
    const toggleExpanded = () => setExpanded(!expanded);
    const Icon = expanded ? ChevronDown : ChevronRight;
    const showShareIcon = title.toUpperCase() === "COLLECTIONS";

    return (
      <section aria-labelledby={`section-${title.toLowerCase()}-heading`}>
        <button
          className={styles.sidebarButton}
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-controls={`section-${title.toLowerCase()}-content`}
          id={`section-${title.toLowerCase()}-heading`}
        >
          <Icon className={styles.icon} size={16} aria-hidden="true" />
          <span className={styles.title}>{title}</span>
          {showShareIcon && (
            <Share2
              className={styles.icon}
              style={{ marginLeft: "auto" }}
              aria-hidden="true"
            />
          )}
        </button>
        {expanded && (
          <div
            id={`section-${title.toLowerCase()}-content`}
            role="region"
            className={styles.sidebarList}
          >
            {children}
          </div>
        )}
      </section>
    );
  },
);

SidebarSection.displayName = "SidebarSection";

export default SidebarSection;
