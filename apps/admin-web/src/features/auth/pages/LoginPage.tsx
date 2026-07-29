import { useState } from "react";
import type { FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";
import type { UserLogin } from "../types";

export function LoginPage({
  onLoggedIn,
}: {
  onLoggedIn: (user: UserLogin | null) => void;
}) {
  const [loginError, setLoginError] = useState("");
  const loginMutation = useLogin();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    loginMutation.mutate(
      {
        email: String(form.get("email")),
        password: String(form.get("password")),
      },
      {
        onSuccess: (result) => {
          setLoginError("");
          onLoggedIn(result.user || null);
        },
        onError: (error) => setLoginError(error.message),
      },
    );
  }

  return (
    <main className="loginShell">
      <section className="loginPanel">
        <div>
          <p className="eyebrow">NexEvent Admin</p>
          <h1>Operate the event marketplace.</h1>
          <p className="muted">
            Sign in with an admin or checker account to manage events, ticket
            inventory, ticket sales, users, and gate operations.
          </p>
        </div>
        <form className="loginForm" onSubmit={submit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="admin@nexevent.vn"
              required
            />
          </label>
          <label>
            Password
            <input name="password" type="password" minLength={8} required />
          </label>
          {loginError && <p className="formError">{loginError}</p>}
          <button className="primaryButton" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
