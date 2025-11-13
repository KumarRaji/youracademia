import React, { useState } from "react";
import { loginApi } from "../src/utils/api";


const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");          // use email (API expects email)
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);            // success / error message
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErr(null);
    try {
      const { message, user } = await loginApi({ email, password });
      setMsg(message || "Login successful");
      // pass user up to parent if needed (store in context/localStorage there)
      onLogin?.(user);
      // Close after a short delay so user sees success
      setTimeout(() => onClose?.(), 600);
    } catch (error) {
      setErr(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div
        style={{ top: "calc(50% + 10rem)" }}
        className="absolute left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg w-96 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        {msg && (
          <div className="mb-3 text-green-700 bg-green-100 border border-green-200 p-2 rounded">
            {msg}
          </div>
        )}
        {err && (
          <div className="mb-3 text-red-700 bg-red-100 border border-red-200 p-2 rounded">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-500 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
