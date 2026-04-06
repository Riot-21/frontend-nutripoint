import {
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always include the first page
    pages.push(1);

    // Build a middle range of up to three pages around current (excluding first and last)
    const middle: number[] = [];
    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      if (p > 1 && p < totalPages) middle.push(p);
    }

    // Left ellipsis if there is a gap between page 1 and the first middle page
    if (middle.length && middle[0] > 2) pages.push("...");

    // Add middle pages (guard against duplicates just in case)
    for (const p of middle) {
      if (!pages.includes(p)) pages.push(p);
    }

    // Right ellipsis if there is a gap between the last middle page and the last page
    if (middle.length && middle[middle.length - 1] < totalPages - 1)
      pages.push("...");

    // Always include the last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-end items-center mt-6 w-full gap-4">
      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChangePage(1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {getPages().map((n, i) =>
          n === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={`page-${n}`}
              onClick={() => onChangePage(n)}
              className={`px-2 transition ${
                currentPage === n
                  ? "underline font-semibold text-blue-900"
                  : "hover:text-blue-700"
              }`}
            >
              {n}
            </button>
          ),
        )}

        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => onChangePage(totalPages)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};
