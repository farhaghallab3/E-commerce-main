// src/lib/Services/authentication.tsx
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
}

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://ecommerce.routemisr.com/api/v1";

export async function signupUserApi(data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  data.email = data.email.trim().toLowerCase();

  try {
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to signup");

    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function loginUserApi(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to login");

    // save token + user
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setCookie("token", result.token, 7);
    }

    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function forgotPasswords(data: { email: string }) {
  try {
    const res = await fetch(`${baseUrl}/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to request reset");

    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function verfiyCode(data: { resetCode: string }) {
  try {
    const res = await fetch(`${baseUrl}/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to verify code");

    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function ResetPassword(data: {
  email: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(`${baseUrl}/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to reset password");

    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
