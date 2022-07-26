import React from "react";
import Layout from "components/Layout";
import Link from "@eGroupTeam/material/Link";
import NextLink from "next/link";

const ReduxExamples = function () {
  return (
    <Layout title="Redux Examples">
      <h1>Redux Example List</h1>
      <p>Redux Examples.</p>
      <p>You are currently on: /redux-examples</p>
      <ul>
        <li>
          <NextLink href="redux-examples/basic">
            <Link sx={{ cursor: "pointer" }}>Basic Example</Link>
          </NextLink>{" "}
        </li>
      </ul>
    </Layout>
  );
};

export default ReduxExamples;
