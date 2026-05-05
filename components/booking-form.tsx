"use client";

import { FormEvent, useState } from "react";
import { bookingOptions } from "@/lib/store-info";

type SubmitState = {
  kind: "idle" | "success" | "error";
  message: string;
};

type BookingResponse =
  | { ok: true; message: string }
  | { ok: false; error: string };

export function BookingForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      pet: String(formData.get("pet") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      expectedArrival: String(formData.get("expectedArrival") ?? "").trim(),
      note: String(formData.get("note") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as BookingResponse;

      if (!response.ok || !result.ok) {
        setSubmitState({
          kind: "error",
          message: result.ok ? "提交失败，请稍后重试。" : result.error,
        });
        return;
      }

      setSubmitState({ kind: "success", message: result.message });
      form.reset();
    } catch {
      setSubmitState({
        kind: "error",
        message: "网络暂时不可用，请稍后重试或直接电话联系。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>快速预约</h3>
        <p>
          提交后最快 10 分钟会响应您的预约。您的手机会收到一条预约成功的短消息。
        </p>
      </div>
      <div className="form-grid">
        <label className="wide">
          期望到店时间
          <input
            name="expectedArrival"
            type="datetime-local"
            required
            aria-label="期望到店时间"
          />
        </label>
        <label>
          联系人
          <input name="name" autoComplete="name" required placeholder="您的姓名" />
        </label>
        <label>
          手机
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="用于确认预约"
          />
        </label>
        <label>
          宠物类型
          <select name="pet" required defaultValue="">
            <option value="">请选择</option>
            {bookingOptions.pets.map((pet) => (
              <option key={pet}>{pet}</option>
            ))}
          </select>
        </label>
        <label>
          预约服务
          <select name="service" required defaultValue="">
            <option value="">请选择</option>
            {bookingOptions.services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="wide">
          备注
          <textarea
            name="note"
            placeholder="例如体重、毛结、皮肤状态或其他需要提前说明的情况"
          />
        </label>
      </div>
      <button className="button submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "提交中" : "提交预约"}
      </button>
      <p
        className={`form-note${submitState.kind === "error" ? " is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {submitState.message}
      </p>
    </form>
  );
}
