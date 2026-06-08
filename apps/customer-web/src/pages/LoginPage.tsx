import { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import authBg from "@/assets/auth-bg.png";
import styles from "./AuthPage.module.css";

// ── Helpers ────────────────────────────────────────────────────
function getErrorMessage(error: unknown): string {
  if (!error) return "";
  // Axios error
  const axiosErr = error as { response?: { data?: { message?: string } } };
  if (axiosErr?.response?.data?.message) return axiosErr.response.data.message;
  if (error instanceof Error) return error.message;
  return "Đăng nhập thất bại. Vui lòng thử lại.";
}

// ── Login Page ─────────────────────────────────────────────────
export default function LoginPage() {
  const id = useId();
  const navigate = useNavigate();

  // Redirect if already authenticated
  const user = useAuthStore((s) => s.user);
  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const { mutate: login, isPending, error, isError } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  // Field-level validation
  const [touched, setTouched] = useState({ email: false, password: false });
  const emailInvalid = touched.email && !email.trim();
  const passwordInvalid = touched.password && password.length < 6;

  const canSubmit = email.trim() && password.length >= 6;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    login(
      { email: email.trim(), password },
      { onSuccess: () => navigate("/") },
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Left visual panel ─────────────────────────────── */}
      <aside className={styles.visual} aria-hidden="true">
        <img
          src={authBg}
          alt="Concert event background"
          className={styles.visualBg}
        />
        <div className={styles.visualOverlay} />
        <div className={styles.visualContent}>
          {/* Brand */}
          <Link to="/" className={styles.visualLogo}>
            <span className={styles.visualLogoMark}>
              <IconCalendarEvent size={18} color="#fff" strokeWidth={2} />
            </span>
            NexEvent
          </Link>

          {/* Bottom copy */}
          <div className={styles.visualBottom}>
            <h2 className={styles.visualHeadline}>
              Khám phá những
              <br />
              sự kiện <em>đáng nhớ</em>
            </h2>
            <p className={styles.visualSub}>
              Từ âm nhạc, thể thao đến hội thảo chuyên nghiệp. Tìm và đặt vé
              ngay hôm nay.
            </p>
            <div className={styles.visualStats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>2.4k+</span>
                <span className={styles.statLabel}>Sự kiện</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>180k</span>
                <span className={styles.statLabel}>Người dùng</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>98%</span>
                <span className={styles.statLabel}>Hài lòng</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ──────────────────────────────── */}
      <main className={styles.formPanel}>
        <div className={styles.formWrap}>
          {/* Header */}
          <header className={styles.formHeader}>
            <h1 className={styles.formTitle}>Đăng nhập</h1>
            <p className={styles.formSub}>
              Chưa có tài khoản?{" "}
              <Link to="/register" className={styles.formSubLink}>
                Tạo tài khoản
              </Link>
            </p>
          </header>

          {/* Server error */}
          {isError && (
            <div className={styles.serverError} role="alert">
              <IconAlertCircle
                size={16}
                strokeWidth={2}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              {getErrorMessage(error)}
            </div>
          )}

          {/* Form */}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Đăng nhập"
          >
            {/* Email */}
            <div className={styles.field}>
              <label htmlFor={`${id}-email`} className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrap}>
                <IconMail
                  size={17}
                  strokeWidth={1.75}
                  className={styles.inputIcon}
                />
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={`${styles.input} ${emailInvalid ? styles.inputError : ""}`}
                  aria-invalid={emailInvalid}
                  aria-describedby={
                    emailInvalid ? `${id}-email-err` : undefined
                  }
                  required
                />
              </div>
              {emailInvalid && (
                <span
                  id={`${id}-email-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  Vui lòng nhập địa chỉ email.
                </span>
              )}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label htmlFor={`${id}-password`} className={styles.label}>
                Mật khẩu
              </label>
              <div className={styles.inputWrap}>
                <IconLock
                  size={17}
                  strokeWidth={1.75}
                  className={styles.inputIcon}
                />
                <input
                  id={`${id}-password`}
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  className={`${styles.input} ${passwordInvalid ? styles.inputError : ""}`}
                  aria-invalid={passwordInvalid}
                  aria-describedby={
                    passwordInvalid ? `${id}-pass-err` : undefined
                  }
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPass ? (
                    <IconEyeOff size={17} strokeWidth={1.75} />
                  ) : (
                    <IconEye size={17} strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {passwordInvalid && (
                <span
                  id={`${id}-pass-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  Mật khẩu phải có ít nhất 6 ký tự.
                </span>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className={styles.formRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Ghi nhớ đăng nhập
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> Đang
                  đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Terms note */}
          <p className={styles.terms}>
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="/terms">Điều khoản dịch vụ</a> và{" "}
            <a href="/privacy">Chính sách bảo mật</a> của chúng tôi.
          </p>
        </div>
      </main>
    </div>
  );
}
