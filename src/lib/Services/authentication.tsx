 
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const result = parts.pop();
    return result ? result.split(';').shift() || null : null;
  }
  return null;
}

function deleteCookie(name: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export async function registerUserApi(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { error: res.statusText || "Failed to register user" };
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function loginUserApi(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to login user" };
    }
    
    const result = await res.json();
    
     localStorage.setItem("token",result.token)
    if (result.token) {
      setCookie('token', result.token, 7);
    }
    
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function ResetPassword(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to reset password" };
    }
    
    const result = await res.json();
    
    // Set cookie if password reset is successful and returns a token
    if (result.token) {
      setCookie('token', result.token, 7);
    }
    
    return result;
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function forgotPasswords(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to send forgot password request" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function verfiyCode(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to verify code" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}

// Logout function - clears the token cookie
export function logoutUser() {
  try {
    deleteCookie('token');
    return { success: true, message: "Logged out successfully" };
  } catch (err: any) {
    return { error: err.message };
  }
}

// Get user profile - requires authentication
export async function getUserProfile() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const token = getCookie('token');
    
    if (!token) {
      return { error: "No authentication token found" };
    }
    
    const res = await fetch(`${baseUrl}/users/getMe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to get user profile" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}