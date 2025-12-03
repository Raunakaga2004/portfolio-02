import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      if (!process.env.NEXTAUTH_SECRET) {
        throw new Error("NEXTAUTH_SECRET is missing");
      }

      const token = jwt.sign(
        { role: "admin" },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: "7d" }
      );

      const redirectUrl = new URL("/admin/", req.url);
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return new NextResponse("Invalid credentials", { status: 401 });

  } catch (err) {
    console.error("Admin login error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
