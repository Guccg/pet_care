import { NextResponse } from "next/server";

type BookingPayload = {
  name?: unknown;
  phone?: unknown;
  pet?: unknown;
  service?: unknown;
  expectedArrival?: unknown;
  note?: unknown;
};

const phonePattern = /^[+\d][\d\s-]{6,19}$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

  return NextResponse.json({
    ok: true,
    message: `${booking.name}，已收到您的${booking.service}预约需求，期望到店时间为${booking.expectedArrival}，我们会尽快电话确认。`,
  });
}
