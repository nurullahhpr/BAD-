"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AppIcon } from "./AppIcon";

export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right";
  /** Makes the column sortable. */
  sortValue?: (row: T) => number | string;
  render: (row: T) => ReactNode;
};

type SortState = { key: string; direction: "asc" | "desc" };

type DataTableProps<T> = {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  initialSort?: SortState;
};

// Real <table> with sortable headers (aria-sort), numbers right-aligned in tabular figures.
// Scrolls sideways inside its own box on narrow screens; the page never does.
export function DataTable<T>({ caption, columns, rows, rowKey, initialSort }: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | undefined>(initialSort);

  const sorted = useMemo(() => {
    const column = columns.find((item) => item.key === sort?.key);
    if (!sort || !column?.sortValue) return rows;
    const value = column.sortValue;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = value(a);
      const right = value(b);
      if (typeof left === "number" && typeof right === "number") return (left - right) * factor;
      return String(left).localeCompare(String(right), "tr") * factor;
    });
  }, [columns, rows, sort]);

  function toggle(key: string) {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "desc" ? "asc" : "desc" }
        : { key, direction: "desc" },
    );
  }

  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5">
      <table className="w-full min-w-[40rem] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const right = column.align === "right";
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={active ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}
                  className={cn(
                    "px-4 py-2.5 text-xs font-medium whitespace-nowrap text-fg-subtle first:pl-4 sm:first:pl-5 last:pr-4 sm:last:pr-5",
                    right ? "text-right" : "text-left",
                  )}
                >
                  {column.sortValue ? (
                    <button
                      type="button"
                      onClick={() => toggle(column.key)}
                      className={cn(
                        "inline-flex items-center gap-1 transition-colors hover:text-fg",
                        right && "flex-row-reverse",
                        active && "text-fg",
                      )}
                    >
                      {column.header}
                      <AppIcon
                        name="sort"
                        className={cn("size-3.5", active ? "text-accent" : "text-fg-subtle/60")}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-line/60 transition-colors last:border-0 hover:bg-surface-raised/60"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-4 py-3 whitespace-nowrap first:pl-4 sm:first:pl-5 last:pr-4 sm:last:pr-5",
                    column.align === "right" ? "text-right tabular-nums" : "text-left",
                  )}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
