import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      router.push("/");
    });
  }, [router]);

  return (
    <div style={{ color: "white", padding: 20 }}>
      Procesando login...
    </div>
  );
}
