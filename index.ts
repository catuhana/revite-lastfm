import { LastFM } from "./lastfm.ts";
import { logger } from "./logger.ts";

// TODO: Add modal or similar thing to make these customisable by the user.
const USERNAME = "";
const API_KEY = "";

(() => {
  const client = window.controllers
    .client
    .getReadyClient();

  // TODO: Support for multiple services like ListenBrainz.
  const plug = new LastFM({
    client,
    apiCredentials: {
      username: USERNAME,
      apiKey: API_KEY,
    },
  });

  plug.start().then(() => logger("Plugin started."));

  return {
    onUnload: () => {
      plug.stop().then(() => logger("Unloaded plugin."));
    },
  };
});
