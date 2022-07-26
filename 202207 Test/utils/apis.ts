import { fetcher } from "@eGroupTeam/hooks/apis/fetchers";
import { LogApiPayload } from "interfaces/payloads";

const tools = {
  /**
   * Log errors.
   */
  createLog: (payload?: LogApiPayload) => fetcher.post("/logs", payload),
};

export default {
  tools,
};
