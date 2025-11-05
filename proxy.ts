import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export async function proxy(request: NextRequest) {
  const mod = await import("next-auth/middleware");
  const middleware = (mod && (mod.default ?? mod)) as any;
  return middleware(request);
}

export const config = {
  matcher: [
    "/create-event",
    "/create-event/new", // add more routes if needed
  ],
};
