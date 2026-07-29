import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconTicket, IconSearch } from "@tabler/icons-react";
import { useAuthStore } from "@/stores/auth.store";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/Button";
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
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <IconTicket size={20} color="#fff" />
          </div>
          <span className={styles.logoText}>
            Nex<span>Event</span>
          </span>
        </Link>

        {/* Search */}
        <form className={styles.search} onSubmit={handleSearch}>
          <IconSearch size={16} color="var(--n500)" />
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
              <Button variant="secondary" onClick={clearAuth}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Đăng ký</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
