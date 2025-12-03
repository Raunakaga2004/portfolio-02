import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  // CHECK GOOGLE ADMIN LOGIN
  const session = await getServerSession();

  const isGoogleAdmin =
    session?.user?.email === process.env.ALLOWED_GOOGLE_ADMIN;

  // CHECK ENV EMAIL/PASS LOGIN (JWT COOKIE)
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  let isEnvAdmin = false;

  if (token) {
    try {
      jwt.verify(token, process.env.NEXTAUTH_SECRET!);
      isEnvAdmin = true;
    } catch (err) {
      isEnvAdmin = false;
    }
  }

  // FINAL AUTH CHECK
  if (!isGoogleAdmin && !isEnvAdmin) {
    return <div>Not authorized</div>;
  }

  // AUTHORIZED ADMIN UI
  return <div>Welcome to Admin Dashboard</div>;
}
