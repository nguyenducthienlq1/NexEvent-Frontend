import { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconUser,
  IconAlertCircle,
  IconCalendarEvent,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useRegister } from "@/hooks/useAuth";
import authBg from "@/assets/auth-bg.png";
import styles from "./AuthPage.module.css";

// ── Helpers ────────────────────────────────────────────────────
function getErrorMessage(error: unknown): string {
  if (!error) return "";
  const axiosErr = error as { response?: { data?: { message?: string } } };
  if (axiosErr?.response?.data?.message) return axiosErr.response.data.message;
  if (error instanceof Error) return error.message;
  return "Đăng ký thất bại. Vui lòng thử lại.";
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ── Register Page ───────────────────────────────────────────────
export default function RegisterPage() {
  const id = useId();
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    error,
    isError,
    isSuccess,
  } = useRegister();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({
    fullname: false,
    email: false,
    password: false,
    confirm: false,
  });

  // Derived validation
  const errors = {
    fullname:
      touched.fullname && form.fullname.trim().length < 2
        ? "Vui lòng nhập họ tên (ít nhất 2 ký tự)."
        : "",
    email:
      touched.email && !validateEmail(form.email)
        ? "Địa chỉ email không hợp lệ."
        : "",
    password:
      touched.password && form.password.length < 8
        ? "Mật khẩu phải có ít nhất 8 ký tự."
        : "",
    confirm:
      touched.confirm && form.confirm !== form.password
        ? "Xác nhận mật khẩu không khớp."
        : "",
  };

  const canSubmit =
    form.fullname.trim().length >= 2 &&
    validateEmail(form.email) &&
    form.password.length >= 8 &&
    form.confirm === form.password;

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };
  }

  function handleBlur(field: keyof typeof touched) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullname: true, email: true, password: true, confirm: true });
    if (!canSubmit) return;
    register({
      fullname: form.fullname.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  }

  // Success state
  if (isSuccess) {
    return (
      <div className={styles.page}>
        <aside className={styles.visual} aria-hidden="true">
          <img
            src={authBg}
            alt="Concert event background"
            className={styles.visualBg}
          />
          <div className={styles.visualOverlay} />
          <div className={styles.visualContent}>
            <Link to="/" className={styles.visualLogo}>
              <span className={styles.visualLogoMark}>
                <IconCalendarEvent size={18} color="#fff" strokeWidth={2} />
              </span>
              NexEvent
            </Link>
            <div className={styles.visualBottom}>
              <h2 className={styles.visualHeadline}>
                Chào mừng bạn
                <br />
                đến với <em>NexEvent</em>
              </h2>
              <p className={styles.visualSub}>
                Tài khoản đã được tạo. Hãy đăng nhập để bắt đầu khám phá các sự
                kiện.
              </p>
            </div>
          </div>
        </aside>
        <main className={styles.formPanel}>
          <div className={styles.formWrap}>
            <div className={styles.successBox}>
              <div className={styles.successIcon}>
                <IconCircleCheck size={28} strokeWidth={2} />
              </div>
              <p className={styles.successTitle}>Tạo tài khoản thành công!</p>
              <p className={styles.successSub}>
                Chúng tôi đã gửi email xác nhận đến{" "}
                <strong>{form.email}</strong>. Vui lòng kiểm tra hộp thư và đăng
                nhập.
              </p>
              <button
                className={styles.submitBtn}
                onClick={() => navigate("/login")}
                style={{ marginTop: "0.5rem" }}
              >
                Đi đến đăng nhập
              </button>
            </div>
          </div>
        </main>
      </div>
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
          <Link to="/" className={styles.visualLogo}>
            <span className={styles.visualLogoMark}>
              <IconCalendarEvent size={18} color="#fff" strokeWidth={2} />
            </span>
            NexEvent
          </Link>
          <div className={styles.visualBottom}>
            <h2 className={styles.visualHeadline}>
              Tham gia cùng
              <br />
              <em>180,000+</em> người dùng
            </h2>
            <p className={styles.visualSub}>
              Đặt vé nhanh chóng, nhận thông báo sự kiện phù hợp và quản lý vé
              của bạn mọi lúc, mọi nơi.
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
            <h1 className={styles.formTitle}>Tạo tài khoản</h1>
            <p className={styles.formSub}>
              Đã có tài khoản?{" "}
              <Link to="/login" className={styles.formSubLink}>
                Đăng nhập
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
            aria-label="Tạo tài khoản"
          >
            {/* Full name */}
            <div className={styles.field}>
              <label htmlFor={`${id}-fullname`} className={styles.label}>
                Họ và tên
              </label>
              <div className={styles.inputWrap}>
                <IconUser
                  size={17}
                  strokeWidth={1.75}
                  className={styles.inputIcon}
                />
                <input
                  id={`${id}-fullname`}
                  type="text"
                  autoComplete="name"
                  placeholder="Nguyễn Văn A"
                  value={form.fullname}
                  onChange={handleChange("fullname")}
                  onBlur={() => handleBlur("fullname")}
                  className={`${styles.input} ${errors.fullname ? styles.inputError : ""}`}
                  aria-invalid={!!errors.fullname}
                  aria-describedby={
                    errors.fullname ? `${id}-fullname-err` : undefined
                  }
                  required
                />
              </div>
              {errors.fullname && (
                <span
                  id={`${id}-fullname-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  {errors.fullname}
                </span>
              )}
            </div>

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
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={() => handleBlur("email")}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? `${id}-email-err` : undefined
                  }
                  required
                />
              </div>
              {errors.email && (
                <span
                  id={`${id}-email-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  {errors.email}
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
                  autoComplete="new-password"
                  placeholder="Ít nhất 8 ký tự"
                  value={form.password}
                  onChange={handleChange("password")}
                  onBlur={() => handleBlur("password")}
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? `${id}-pass-err` : undefined
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
              {errors.password && (
                <span
                  id={`${id}-pass-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.field}>
              <label htmlFor={`${id}-confirm`} className={styles.label}>
                Xác nhận mật khẩu
              </label>
              <div className={styles.inputWrap}>
                <IconLock
                  size={17}
                  strokeWidth={1.75}
                  className={styles.inputIcon}
                />
                <input
                  id={`${id}-confirm`}
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Nhập lại mật khẩu"
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  onBlur={() => handleBlur("confirm")}
                  className={`${styles.input} ${errors.confirm ? styles.inputError : ""}`}
                  aria-invalid={!!errors.confirm}
                  aria-describedby={
                    errors.confirm ? `${id}-confirm-err` : undefined
                  }
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showConfirm ? (
                    <IconEyeOff size={17} strokeWidth={1.75} />
                  ) : (
                    <IconEye size={17} strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {errors.confirm && (
                <span
                  id={`${id}-confirm-err`}
                  className={styles.errorText}
                  role="alert"
                >
                  <IconAlertCircle size={13} />
                  {errors.confirm}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isPending}
              aria-busy={isPending}
              style={{ marginTop: "0.25rem" }}
            >
              {isPending ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> Đang
                  tạo tài khoản...
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </button>
          </form>

          {/* Terms */}
          <p className={styles.terms}>
            Bằng cách tạo tài khoản, bạn đồng ý với{" "}
            <a href="/terms">Điều khoản dịch vụ</a> và{" "}
            <a href="/privacy">Chính sách bảo mật</a> của chúng tôi.
          </p>
        </div>
      </main>
    </div>
  );
}
