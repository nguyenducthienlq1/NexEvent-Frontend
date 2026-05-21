export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Thêm tính năng mới (vd: giỏ hàng, thanh toán)
        "fix", // Sửa lỗi bug
        "docs", // Cập nhật tài liệu (README, Swagger...)
        "style", // Format code, CSS, xóa khoảng trắng (không đổi logic)
        "refactor", // Tái cấu trúc code (không thêm tính năng, không sửa lỗi)
        "perf", // Cải thiện hiệu năng (tối ưu render, load nhanh hơn)
        "test", // Thêm hoặc sửa test case
        "chore", // Cập nhật linh tinh (đổi text, update thư viện...)
        "revert", // Khôi phục lại commit cũ
        "build", // Thay đổi cấu hình build (Vite, Turborepo, pnpm)
        "ci", // Thay đổi cấu hình CI/CD (Vercel, GitHub Actions, Husky)
      ],
    ],

    // 2. Định nghĩa Scope (Phạm vi)
    "scope-enum": [
      2,
      "always",
      [
        "admin", // Code trong apps/admin-web
        "customer", // Code trong apps/customer-web
        "shared", // Code dùng chung trong packages/
        "api", // Liên quan đến file call API
        "ui", // Liên quan đến UI Components (AntD, Tailwind)
        "repo", // Cấu hình chung của cả cục Monorepo
        "deps", // Cập nhật thư viện (dependencies)
      ],
    ],

    // 3. Quy tắc cho nội dung (Subject)
    "type-empty": [2, "never"], // Không được để trống Type
    "subject-empty": [2, "never"], // Không được để trống Nội dung
    "subject-full-stop": [2, "never", "."], // Nội dung KHÔNG được kết thúc bằng dấu chấm
    "header-max-length": [2, "always", 100], // Giới hạn dòng tiêu đề commit tối đa 100 ký tự
    "subject-case": [0], // Cho phép viết hoa/thường tùy ý
  },
};
