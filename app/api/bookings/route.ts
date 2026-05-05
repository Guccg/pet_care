import { NextResponse } from "next/server";
import { getPostgresPool } from "@/lib/postgres";

export const runtime = "nodejs";

type BookingPayload = {
  name?: unknown;
  phone?: unknown;
  pet?: unknown;
  service?: unknown;
  expectedArrival?: unknown;
  note?: unknown;
};

const phonePattern = /^[+\d][\d\s-]{6,19}$/;
const expectedArrivalPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidExpectedArrival(value: string) {
  if (!expectedArrivalPattern.test(value)) {
    return false;
  }

  const arrival = new Date(value);
  return !Number.isNaN(arrival.getTime());
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "提交内容格式不正确，请重新填写。" },
      { status: 400 },
    );
  }

  const booking = {
    name: normalize(payload.name),
    phone: normalize(payload.phone),
    pet: normalize(payload.pet),
    service: normalize(payload.service),
    expectedArrival: normalize(payload.expectedArrival),
    note: normalize(payload.note),
  };

  if (
    !booking.name ||
    !booking.phone ||
    !booking.pet ||
    !booking.service ||
    !booking.expectedArrival
  ) {
    return NextResponse.json(
      { ok: false, error: "请填写联系人、手机、宠物类型、预约服务和期望到店时间。" },
      { status: 400 },
    );
  }

  if (!phonePattern.test(booking.phone)) {
    return NextResponse.json(
      { ok: false, error: "请填写有效的联系电话。" },
      { status: 400 },
    );
  }

  if (!isValidExpectedArrival(booking.expectedArrival)) {
    return NextResponse.json(
      { ok: false, error: "请填写有效的期望到店时间。" },
      { status: 400 },
    );
  }

  try {
    const pool = getPostgresPool();
    await pool.query(
      `
        insert into public.bookings (
          customer_name,
          phone,
          pet_type,
          service_type,
          expected_arrival_at,
          note
        )
        values ($1, $2, $3, $4, $5::timestamp, $6)
      `,
      [
        booking.name,
        booking.phone,
        booking.pet,
        booking.service,
        booking.expectedArrival,
        booking.note,
      ],
    );

    return NextResponse.json({
      ok: true,
      message: `${booking.name}，已收到您的${booking.service}预约需求，期望到店时间为${booking.expectedArrival}，我们会尽快电话确认。`,
    });
  } catch (error) {
    console.error("Failed to create booking.", error);

    return NextResponse.json(
      { ok: false, error: "预约暂时提交失败，请稍后重试或直接电话联系。" },
      { status: 500 },
    );
  }
}
