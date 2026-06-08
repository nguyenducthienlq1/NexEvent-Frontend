import {
  IconTicket,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <IconTicket size={14} color="var(--g200)" />
            <span>
              Nex<span style={{ color: "var(--g200)" }}>Event</span>
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
          <span className={styles.link}>Sự kiện âm nhạc</span>
          <span className={styles.link}>Thể thao</span>
          <span className={styles.link}>Nghệ thuật</span>
          <span className={styles.link}>Tech & Conference</span>
        </div>

        <div>
          <div className={styles.colTitle}>Hỗ trợ</div>
          <span className={styles.link}>Trung tâm trợ giúp</span>
          <span className={styles.link}>Hoàn vé</span>
          <span className={styles.link}>Liên hệ</span>
        </div>

        <div>
          <div className={styles.colTitle}>Kết nối</div>
          <span className={styles.link}>
            <IconBrandFacebook size={11} /> Facebook
          </span>
          <span className={styles.link}>
            <IconBrandInstagram size={11} /> Instagram
          </span>
          <span className={styles.link}>
            <IconBrandTiktok size={11} /> TikTok
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 NexEvent. All rights reserved.</span>
        <span>Bảo mật · Điều khoản · Cookie</span>
      </div>
    </footer>
  );
}
