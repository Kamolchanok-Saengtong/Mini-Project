// lib/auth.js
import { serialize } from "cookie";

export const setLoginSession = (res, user) => {
  const cookie = serialize("userSession", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};
