import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEvents, useEventSearch } from "@/features/events/hooks/useEvents";
import { useDebounce } from "@/hooks/useDebounce";
import HeroBanner from "@/features/events/components/HeroBanner";
import StatsBar from "@/features/events/components/StatsBar";
import CategoryFilter, {
  type Category,
} from "@/features/events/components/CategoryFilter";
import EventGrid from "@/features/events/components/EventGrid";
import Pagination from "@/features/events/components/Pagination";
import styles from "./HomePage.module.css";
import type { Event } from "../types/event.types";

const PAGE_SIZE = 9;

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<Category>("all");

  // Fetch tất cả events hoặc kết quả tìm kiếm
  const listQuery = useEvents({ page, size: PAGE_SIZE, sortBy: "createdAt" });
  const searchResult = useEventSearch(debouncedSearch, {
    page,
    size: PAGE_SIZE,
  });

  const isSearching = debouncedSearch.trim().length > 0;
  const query = isSearching ? searchResult : listQuery;

  const events = query.data?.content ?? [];
  const totalPages = query.data?.totalPages ?? 0;
  const totalElements = query.data?.totalElements ?? 0;
  const featuredEvent = events[0];

  const uniqueLocations = new Set(
    events.map((e: Event) => e.location).filter(Boolean),
  ).size;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setPage(0);
  };

  if (query.isError) {
    return (
      <div className={styles.errorState}>
        <p>Không thể tải dữ liệu. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero — hiển thị khi không search và có data */}
      {!isSearching && featuredEvent && <HeroBanner event={featuredEvent} />}

      {/* Stats */}
      {!isSearching && (
        <StatsBar
          totalEvents={totalElements}
          uniqueLocations={uniqueLocations}
        />
      )}

      {/* Filter */}
      <CategoryFilter active={category} onChange={handleCategoryChange} />

      {/* Grid */}
      {query.isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>Đang tải sự kiện...</p>
        </div>
      ) : events.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Không tìm thấy sự kiện nào.</p>
        </div>
      ) : (
        <EventGrid events={events} total={totalElements} />
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}
