import { cookies } from "next/headers";
import { verifyTokens } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const decoded = verifyTokens(token);

  if (!decoded) throw new Error("Unauthorized");
  return decoded.userId;
}
