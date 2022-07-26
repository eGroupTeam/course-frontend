import React, { FC } from "react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import Link from "@eGroupTeam/material/Link";

import { Post } from "interfaces/entities";
import Layout from "components/Layout";
import { List, ListItem, ListItemText } from "@eGroupTeam/material";
import { fetcher } from "@eGroupTeam/hooks/apis/fetchers";

type PostsProps = {
  posts: Post[];
};

const Posts: FC<PostsProps> = function Posts({ posts }: PostsProps) {
  return (
    <Layout title="Post List | Next.js + TypeScript Example">
      <h1>Post List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /posts</p>
      <List>
        {posts.map((el) => (
          <ListItem key={el.id}>
            <ListItemText>{el.title}</ListItemText>
          </ListItem>
        ))}
      </List>
      <p>
        <NextLink href="/">
          <Link sx={{ cursor: "pointer" }}>Go home</Link>
        </NextLink>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const posts: Post[] = await fetcher
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data);
  return { props: { posts } };
};

export default Posts;
