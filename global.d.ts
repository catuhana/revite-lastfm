import type { Client, Session } from "npm:revolt.js";

declare global {
  interface RevoltClient extends Client {}
  interface RevoltSession extends Session {}

  interface Window {
    controllers: {
      client: {
        sessions: Map<string, Session>;
        getReadyClient(): Client;
      };
    };
  }
}
