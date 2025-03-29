/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from "@/app/(root)/_styles/table.module.css";

interface TableProps {
  result: Record<string, unknown>[] | null;
}

export const Table = ({ result }: TableProps) => {
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [data, setData] = useState<any[]>([]);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<any>();

  useEffect(() => {
    if (result && result.length > 0) {
      const columns = Object.keys(result[0]).map(key =>
        columnHelper.accessor(key, {
          header: key,
          cell: info => info.getValue(),
        }),
      );
      setData(result);
      setColumns(columns);
    } else {
      setData([]);
      setColumns([]);
    }
  }, [columnHelper, result]);

  const table = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 40, // Average row height
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div ref={tableContainerRef} className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={styles.tableHeaderCell}
                  style={{ width: header.getSize() }}
                >
                  <div
                    className={`${styles.headerContent} ${
                      header.column.getCanSort() ? styles.sortableHeader : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: <ArrowUp className={styles.sortIcon} />,
                      desc: <ArrowDown className={styles.sortIcon} />,
                    }[header.column.getIsSorted() as string] ??
                      (header.column.getCanSort() && (
                        <ArrowUpDown className={styles.sortIcon} />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index];
            return (
              <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={styles.tableCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
