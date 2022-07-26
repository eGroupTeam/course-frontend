import React from "react";
import Layout from "components/Layout";
import Link from "@eGroupTeam/material/Link";
import NextLink from "next/link";

const HookFormExamples = function () {
  return (
    <Layout title="React Hook Form Examples">
      <h1>React Hook Form Examples</h1>
      <p>React Hook Form Examples</p>
      <p>You are currently on: /react-hook-form-examples</p>
      <ul>
        <li>
          <NextLink href="react-hook-form-examples/basic">
            <Link sx={{ cursor: "pointer" }}>Basic Example</Link>
          </NextLink>{" "}
        </li>
      </ul>
    </Layout>
  );
};

export default HookFormExamples;
