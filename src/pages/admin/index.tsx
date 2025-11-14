import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
        return;
      }

      setLoading(false);
    }

    checkSession();
  }, [router]);

  if (loading) return <p style={{ color: "white" }}>Cargando...</p>;

  return (
    <div style={{ color: "white", padding: 20 }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido administrador.</p>
    </div>
  );
}
