import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEvents, useEventSearch } from "@/hooks/useEvents";
import { useDebounce } from "@/hooks/useDebounce";
import HeroBanner from "@/components/home/HeroBanner";
import StatsBar from "@/components/home/StatsBar";
import CategoryFilter, {
  type Category,
} from "@/components/home/CategoryFilter";
import EventGrid from "@/components/home/EventGrid";
import Pagination from "@/components/home/Pagination";
import styles from "./HomePage.module.css";

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
      {!isSearching && <StatsBar />}

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
