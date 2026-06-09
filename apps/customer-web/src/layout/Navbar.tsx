import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconTicket, IconSearch } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth.store";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        <div className={styles.logoMark}>
          <IconTicket size={15} color="#fff" />
        </div>
        <span className={styles.logoText}>
          Nex<span>Event</span>
        </span>
      </Link>

      {/* Search */}
      <form className={styles.search} onSubmit={handleSearch}>
        <IconSearch size={13} color="var(--n400)" />
        <input
          type="text"
          placeholder="Tìm sự kiện, nghệ sĩ, địa điểm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Right actions */}
      <div className={styles.right}>
        <Link to="/" className={styles.navLink}>
          Khám phá
        </Link>

        {user ? (
          <>
            <Link to="/my-tickets" className={styles.navLink}>
              Vé của tôi
            </Link>
            <button className={styles.btnOutline} onClick={clearAuth}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.btnOutline}>
              Đăng nhập
            </Link>
            <Link to="/register" className={styles.btnFill}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
