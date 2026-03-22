import { useState, useEffect, useMemo } from "react";
import { History, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { historyDb } from "@/lib/db";
import { HistoryCard } from "./HistoryCard";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadHistory();
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return history;
    const lowerQuery = searchQuery.toLowerCase();
    return history.filter(
      (item) =>
        (item.companyName &&
          item.companyName.toLowerCase().includes(lowerQuery)) ||
        (item.question && item.question.toLowerCase().includes(lowerQuery)),
    );
  }, [history, searchQuery]);

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE) || 1;
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHistory.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHistory, currentPage]);

  const loadHistory = async () => {
    try {
      const data = await historyDb.getAll();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await historyDb.delete(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <History className="text-accent" size={28} />
          History
        </h1>
        <p className="text-text-secondary mt-2">
          Your past generated answers — click to expand and view details.
        </p>
      </div>

      {/* Search Bar */}
      {history.length > 0 && (
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted group-focus-within:text-accent transition-colors" />
          </div>
          <Input
            type="text"
            placeholder="Search by company or question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full h-auto pl-11 pr-10 py-3.5 rounded-xl border border-border-default bg-bg-card",
              "text-text-primary placeholder-text-muted shadow-sm transition-all duration-200",
              "focus-visible:ring-1 focus-visible:ring-accent/30 focus-visible:border-accent hover:border-accent/40",
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* History List */}
      {history.length === 0 ? (
        <div className="text-center py-16">
          <History size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No history yet.</p>
          <p className="text-text-muted text-sm mt-1">
            Generated answers will appear here.
          </p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-bg-card border border-border-default border-dashed rounded-xl">
          <Search
            size={32}
            className="text-text-muted mx-auto mb-3 opacity-50"
          />
          <p className="text-text-secondary font-medium">
            No results found for "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-accent hover:text-accent-hover text-sm mt-2 transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedHistory.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-border-default/50 mt-6">
              <span className="text-sm font-medium text-text-muted">
                Page {currentPage} of {totalPages}
              </span>

              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={cn(
                        "rounded-lg border border-border-default bg-bg-card hover:bg-bg-card-hover text-text-primary",
                        currentPage === 1
                          ? "pointer-events-none opacity-40"
                          : "cursor-pointer",
                      )}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={cn(
                        "rounded-lg border border-border-default bg-bg-card hover:bg-bg-card-hover text-text-primary",
                        currentPage === totalPages
                          ? "pointer-events-none opacity-40"
                          : "cursor-pointer",
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
