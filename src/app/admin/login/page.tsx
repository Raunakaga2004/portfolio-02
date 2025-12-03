"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEnvLogin(e: any) {
    e.preventDefault();

    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.redirected) {
      window.location.href = res.url;
      return;
    }

    alert("Invalid email or password");
  }

  return (
    <div>
      <h1>Admin Login</h1>

      {/* Email + Password Login */}
      <form onSubmit={handleEnvLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login with Email & Password</button>
      </form>

      {/* Google Login */}
      <button onClick={() => signIn("google")}>
        Login with Google
      </button>
    </div>
  );
}
