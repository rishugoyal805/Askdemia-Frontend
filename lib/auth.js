import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const COOKIE_NAME = "auth_token"

export async function getSession() {
  const cookieStore = await cookies(); // Await cookies() before using it
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return null;
  }

  try {
    const verified = verify(token.value, JWT_SECRET);
    return verified;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}
