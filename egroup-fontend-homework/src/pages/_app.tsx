import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext, AUTH_STATUS } from "components/auth/AuthContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.LOGIN);
  const [name, setName] = useState<string>("");
  return (
    <AuthContext.Provider value={{ name, setName, status, setStatus }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
