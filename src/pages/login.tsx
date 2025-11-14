// src/pages/login.tsx
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div
      style={{
        color: "white",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Iniciar sesión</h1>
      <p>Accede utilizando tu cuenta de Discord</p>

      <button
        onClick={handleDiscordLogin}
        style={{
          background: "#5865F2",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontSize: "18px",
        }}
      >
        🔑 Login con Discord
      </button>
    </div>
  );
}
