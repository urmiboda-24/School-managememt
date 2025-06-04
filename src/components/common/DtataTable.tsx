import React, { useState, useEffect } from "react";

interface Column {
  header: string;
  accessor: string;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  pageSize?: number;

  // Parent handlers
  onSearch?: (searchTerm: string) => void;
  onSort?: (accessor: string, direction: "asc" | "desc" | null) => void;
  onPageChange?: (page: number) => void;

  // Controlled props
  totalCount?: number; // total rows in the backend (if server-side)
  currentPage?: number;
  sortField?: string;
  sortDirection?: "asc" | "desc" | null;
  searchTerm?: string;
}

export function CommonTable({
  columns,
  data,
  pageSize = 10,
  onSearch,
  onSort,
  onPageChange,
  totalCount,
  currentPage: currentPageProp,
  sortField,
  sortDirection,
  searchTerm: searchTermProp,
}: TableProps) {
  // Internal state only if not controlled by parent
  const [internalPage, setInternalPage] = useState(1);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [internalSortField, setInternalSortField] = useState<string | null>(
    null
  );
  const [internalSortDirection, setInternalSortDirection] = useState<
    "asc" | "desc" | null
  >(null);

  const isControlledPage = currentPageProp !== undefined;
  const isControlledSearch = searchTermProp !== undefined;
  const isControlledSort =
    sortField !== undefined && sortDirection !== undefined;

  // Use controlled or internal state
  const currentPage = isControlledPage ? currentPageProp! : internalPage;
  const searchTerm = isControlledSearch ? searchTermProp! : internalSearchTerm;
  const sortFieldFinal = isControlledSort ? sortField! : internalSortField;
  const sortDirectionFinal = isControlledSort
    ? sortDirection!
    : internalSortDirection;

  const totalItems = totalCount ?? data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlledSearch) setInternalSearchTerm(val);
    onSearch?.(val);
  };

  // Sorting handler
  const handleSort = (col: Column) => {
    if (!col.sortable) return;

    let direction: "asc" | "desc" | null = "asc";

    if (sortFieldFinal === col.accessor) {
      // Toggle sort direction
      if (sortDirectionFinal === "asc") direction = "desc";
      else if (sortDirectionFinal === "desc") direction = null;
      else direction = "asc";
    }

    if (!isControlledSort) {
      setInternalSortField(direction ? col.accessor : null);
      setInternalSortDirection(direction);
    }
    onSort?.(direction ? col.accessor : "", direction);
  };

  // Page change handler
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (!isControlledPage) setInternalPage(page);
    onPageChange?.(page);
  };

  // Pagination buttons generator with ellipsis logic
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];

    // Always show first page
    pages.push(
      <li key={1}>
        <button
          onClick={() => changePage(1)}
          aria-current={currentPage === 1 ? "page" : undefined}
          className={`px-3 h-8 leading-tight border ${
            currentPage === 1
              ? "text-blue-600 border-gray-300 bg-blue-50"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          1
        </button>
      </li>
    );

    // Show left ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <li key="left-ellipsis" className="flex items-center px-2 select-none">
          ...
        </li>
      );
    }

    // Show pages around current page (except 1 and last)
    for (let page = currentPage - 1; page <= currentPage + 1; page++) {
      if (page > 1 && page < totalPages) {
        pages.push(
          <li key={page}>
            <button
              onClick={() => changePage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`px-3 h-8 leading-tight border ${
                currentPage === page
                  ? "text-blue-600 border-gray-300 bg-blue-50"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        );
      }
    }

    // Show right ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <li key="right-ellipsis" className="flex items-center px-2 select-none">
          ...
        </li>
      );
    }

    // Always show last page if totalPages > 1
    if (totalPages > 1) {
      pages.push(
        <li key={totalPages}>
          <button
            onClick={() => changePage(totalPages)}
            aria-current={currentPage === totalPages ? "page" : undefined}
            className={`px-3 h-8 leading-tight border ${
              currentPage === totalPages
                ? "text-blue-600 border-gray-300 bg-blue-50"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  // Data slicing if client-side pagination
  const paginateData =
    totalCount === undefined
      ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : data;

  return (
    <div>
      {/* Search input */}
      {onSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-1 w-full max-w-xs"
          />
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col) => {
                const isSorted = col.accessor === sortFieldFinal;
                return (
                  <th
                    key={col.accessor}
                    scope="col"
                    className={`px-6 py-3 select-none ${
                      col.sortable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => handleSort(col)}
                  >
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <SortIndicator
                          direction={isSorted ? sortDirectionFinal : null}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginateData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No data available.
                </td>
              </tr>
            )}
            {paginateData.map((row, idx) => (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-6 py-4">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalItems}
            </span>
          </span>

          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {/* Prev button */}
            <li>
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border rounded-l-lg
                ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Previous
              </button>
            </li>

            {/* Page numbers with ellipsis */}
            {renderPagination()}

            {/* Next button */}
            <li>
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-r-lg
                ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed bg-white dark:bg-gray-800 dark:border-gray-700"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

interface SortIndicatorProps {
  direction: "asc" | "desc" | null | undefined;
}

const SortIndicator = ({ direction }: SortIndicatorProps) => {
  return (
    <span>
      {direction === "asc" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      )}
      {direction === "desc" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
      {!direction && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-3 h-3 opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </span>
  );
};
