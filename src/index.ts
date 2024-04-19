import { LastFM } from "./lastfm.ts";
import { logger } from "./logger.ts";

const USERNAME = ".{{USERNAME}}.";
const API_KEY = ".{{API_KEY}}.";

(() => {
  let client = window.controllers
    .client
    .getReadyClient();
  let plug: LastFM;

  const retrieveClient = setInterval(() => {
    if (!client) {
      client = window.controllers
        .client
        .getReadyClient();
    } else {
      // TODO: Support for multiple services like ListenBrainz.
      plug = new LastFM({
        client,
        apiCredentials: {
          username: USERNAME,
          apiKey: API_KEY,
        },
      });

      plug.start().then(() => logger("Plugin started."));

      clearInterval(retrieveClient);
    }
  }, 1000);

  return {
    onUnload: () => {
      plug.stop().then(() => logger("Unloaded plugin."));
    },
  };
});
