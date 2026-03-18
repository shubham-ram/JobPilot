import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { historyDb } from "@/lib/db";
import { HistoryCard } from "./HistoryCard";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

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

      {/* History List */}
      {history.length === 0 ? (
        <div className="text-center py-16">
          <History size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No history yet.</p>
          <p className="text-text-muted text-sm mt-1">
            Generated answers will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
