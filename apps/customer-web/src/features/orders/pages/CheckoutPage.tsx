import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { orderApi } from "@/features/orders/api/order.api";
import { Button } from "@/components/ui/Button";
import styles from "./CheckoutPage.module.css";

function formatMoney(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function CheckoutPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { totalAmount?: number };
  const totalAmount = state?.totalAmount || 0;

  const payOrder = useMutation({
    mutationFn: (id: number) => orderApi.pay(id),
    onSuccess: () => {
      navigate("/my-tickets", { replace: true });
    },
    onError: (err) => {
      alert("Thanh toán thất bại. Vui lòng thử lại.");
      console.error(err);
    },
  });

  const handlePay = () => {
    if (!orderId) return;
    payOrder.mutate(Number(orderId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutCard}>
        <h1>Thanh toán an toàn</h1>
        <p>Vui lòng xác nhận thanh toán cho đơn hàng #{orderId}</p>

        <div className={styles.orderInfo}>
          <span className={styles.totalLabel}>Tổng thanh toán</span>
          <div className={styles.totalValue}>{formatMoney(totalAmount)}</div>
        </div>

        <Button
          variant="primary"
          className={styles.payBtn}
          disabled={payOrder.isPending || !orderId}
          onClick={handlePay}
        >
          {payOrder.isPending ? "Đang xử lý..." : "Xác nhận thanh toán"}
        </Button>
      </div>
    </div>
  );
}
