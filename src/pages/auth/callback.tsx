import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../src/lib/supabase";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Usuario logueado → enviarlo al dashboard
        router.replace("/admin");
      } else {
        // No hay sesión → volver al login
        router.replace("/login");
      }
    };

    handleAuth();
  }, []);

  return <p>Procesando autenticación...</p>;
}
