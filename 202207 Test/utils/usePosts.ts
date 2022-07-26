import makeGetHook from "@eGroupTeam/hooks/apis/makeGetHook";
import { Post } from "interfaces/entities";

import { fetcher } from "@eGroupTeam/hooks/apis/fetchers";

const usePosts = makeGetHook<Post[]>(
  "https://jsonplaceholder.typicode.com/posts",
  fetcher
);
export default usePosts;
