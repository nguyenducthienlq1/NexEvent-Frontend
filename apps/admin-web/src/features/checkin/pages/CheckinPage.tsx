import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "../../../components/common/Badge";
import { EmptyState } from "../../../components/common/EmptyState";
import { formatDate } from "../../../lib/format";
import { checkinApi } from "../api/checkin.api";
import type { CheckinResult } from "../types";

export function CheckinPage() {
  const [result, setResult] = useState<CheckinResult | null>(null);
  const mutation = useMutation({
    mutationFn: (payload: { qrToken: string; gate: string }) =>
      checkinApi.checkin(payload.qrToken, payload.gate),
    onSuccess: setResult,
  });

  return (
    <section className="splitGrid constrainedPage">
      <form
        className="panel checkinPanel"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          mutation.mutate({
            qrToken: String(form.get("qrToken")),
            gate: String(form.get("gate")),
          });
        }}
      >
        <div className="panelHeader">
          <div>
            <h2>Quét vé tại cổng</h2>
            <p>
              Sử dụng tài khoản Checker. Tài khoản Admin có thể bị từ chối quyền
              check-in theo luật của hệ thống.
            </p>
          </div>
        </div>
        <label>
          Mã QR
          <textarea
            name="qrToken"
            rows={8}
            placeholder="Dán hoặc quét mã QR"
            required
          />
        </label>
        <label>
          Cổng
          <input name="gate" placeholder="G1" required />
        </label>
        {mutation.isError && (
          <p className="formError">
            Điểm danh thất bại. Vé có thể không hợp lệ, đã được sử dụng hoặc tài
            khoản không có quyền.
          </p>
        )}
        <button className="primaryButton" disabled={mutation.isPending}>
          {mutation.isPending ? "Đang kiểm tra..." : "Điểm danh vé"}
        </button>
      </form>

      <section className="panel">
        <div className="panelHeader">
          <div>
            <h2>Lần quét gần nhất</h2>
            <p>Kết quả xác thực từ hệ thống.</p>
          </div>
          {result && <Badge value="HỢP LỆ" tone="good" />}
        </div>
        {result ? (
          <dl className="detailList">
            <div>
              <dt>Khách hàng</dt>
              <dd>{result.customerName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{result.customerEmail}</dd>
            </div>
            <div>
              <dt>Sự kiện</dt>
              <dd>{result.eventName}</dd>
            </div>
            <div>
              <dt>Loại vé</dt>
              <dd>{result.ticketTypeName}</dd>
            </div>
            <div>
              <dt>Cổng</dt>
              <dd>{result.gate}</dd>
            </div>
            <div>
              <dt>Thời gian quét</dt>
              <dd>{formatDate(result.checkedInAt)}</dd>
            </div>
          </dl>
        ) : (
          <EmptyState
            title="Chưa quét vé nào"
            text="Hãy quét một vé để xem thông tin người tham dự."
          />
        )}
      </section>
    </section>
  );
}
