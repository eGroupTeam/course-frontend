import React, { FC, ReactNode } from "react";
import NextLink from "next/link";
import Head from "next/head";
import Link from "@eGroupTeam/material/Link";
import Button from "@eGroupTeam/material/Button";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout: FC<LayoutProps> = function Layout(props) {
  const { children, title = "This is the default title" } = props;
  const [, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  const handleLogin = () => {
    setCookie("hasLoginCookie", "true");
    // eslint-disable-next-line no-alert
    alert("Login !");
  };

  const handleLogout = () => {
    removeCookie("hasLoginCookie");
    router.reload();
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <NextLink href="/">
            <Link sx={{ cursor: "pointer" }}>Home</Link>
          </NextLink>{" "}
          |{" "}
          <NextLink href="/me">
            <Link sx={{ cursor: "pointer" }}>Private Pages</Link>
          </NextLink>{" "}
          |{" "}
          <NextLink href="/posts">
            <Link sx={{ cursor: "pointer" }}>Post List</Link>
          </NextLink>{" "}
          |{" "}
          <NextLink href="/redux-examples">
            <Link sx={{ cursor: "pointer" }}>Redux Examples</Link>
          </NextLink>{" "}
          |{" "}
          <NextLink href="/react-hook-form-examples">
            <Link sx={{ cursor: "pointer" }}>React Hook Form Examples</Link>
          </NextLink>
        </nav>
      </header>
      <div>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          size="small"
          disableElevation
        >
          Logout
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          size="small"
          disableElevation
        >
          Login
        </Button>
      </div>
      {children}
      <footer>
        <hr />
        <span>I&apos;m here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
