import {
  IconTicket,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer style={{ background: "var(--n900)", marginTop: "auto" }}>
      <div className={styles.footer}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <IconTicket size={24} color="var(--brand-primary)" />
            <span>
              Nex<span style={{ color: "var(--brand-primary)" }}>Event</span>
            </span>
          </div>
          <p>
            Nền tảng mua bán vé sự kiện
            <br />
            hàng đầu Việt Nam.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>Khám phá</div>
          <a href="#" className={styles.link}>
            Sự kiện âm nhạc
          </a>
          <a href="#" className={styles.link}>
            Thể thao
          </a>
          <a href="#" className={styles.link}>
            Nghệ thuật
          </a>
          <a href="#" className={styles.link}>
            Tech & Conference
          </a>
        </div>

        <div>
          <div className={styles.colTitle}>Hỗ trợ</div>
          <a href="#" className={styles.link}>
            Trung tâm trợ giúp
          </a>
          <a href="#" className={styles.link}>
            Hoàn vé
          </a>
          <a href="#" className={styles.link}>
            Liên hệ
          </a>
        </div>

        <div>
          <div className={styles.colTitle}>Kết nối</div>
          <a href="#" className={styles.link}>
            <IconBrandFacebook size={16} /> Facebook
          </a>
          <a href="#" className={styles.link}>
            <IconBrandInstagram size={16} /> Instagram
          </a>
          <a href="#" className={styles.link}>
            <IconBrandTiktok size={16} /> TikTok
          </a>
        </div>
      </div>

      <div className={styles.bottomWrapper}>
        <div className={styles.bottom}>
          <span>© 2025 NexEvent. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Bảo mật
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Điều khoản
            </a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
