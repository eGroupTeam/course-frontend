import React, { FC, ReactNode } from "react";

import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Head from "next/head";
import NextLink from "next/link";
import Link from "@eGroupTeam/material/Link";
import Button from "@eGroupTeam/material/Button";

import { logout } from "redux/privateLayout";

type PrivateLayoutProps = {
  children?: ReactNode;
  title?: string;
};

const PrivateLayout: FC<PrivateLayoutProps> = function PrivateLayout(props) {
  const { children, title = "This is the default title" } = props;
  const dispatch = useDispatch();
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
    dispatch(logout());
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <NextLink href="/">
            <Link sx={{ cursor: "pointer" }}>Go home</Link>
          </NextLink>{" "}
          | <NextLink href="/me">Private Home</NextLink> |{" "}
          <NextLink href="/me/dashboard">Private Dashboard</NextLink>
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
      <h1>Private Pages</h1>
      <p>Example private page, only get cookie can login to this page.</p>
      <p>You are currently on: /me</p>
      {children}
      <footer>
        <hr />
        <span>I&aposm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default PrivateLayout;
