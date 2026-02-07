"use server";

import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function verifyAndLogin(idToken) {
  try {
    // 1. Verify the token with Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    if (uid) {
      // 2. Set the secure session cookie
      (await cookies()).set("firebase-token", idToken, {
        httpOnly: true,
        secure: true,
        path: "/",
      });
      return { success: true };
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return { success: false, error: "Unauthorized" };
  }
}