const API_BASE = ""; // Use Vite proxy

export async function loginApi({ email, password }) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Login failed");
    }
    return data; // { message: "Login successful", user: { ... } }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Make sure backend is running on port 3001.');
    }
    throw error;
  }
}
