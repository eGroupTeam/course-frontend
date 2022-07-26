import FixedCenter from "@eGroupTeam/material-layout/FixedCenter";
import { CircularProgress } from "@eGroupTeam/material";
import PrivateLayout from "components/PrivateLayout";
import React from "react";
import usePosts from "utils/usePosts";

const Home = function Home() {
  const { data } = usePosts();

  if (!data) {
    return (
      <FixedCenter>
        <CircularProgress />
      </FixedCenter>
    );
  }

  return (
    <PrivateLayout>
      Posts:
      <br />
      {JSON.stringify(data, undefined, 4)}
    </PrivateLayout>
  );
};

export default Home;
