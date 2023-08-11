import type { Client, Session } from "npm:revolt.js";

declare global {
  interface Window {
    controllers: {
      client: {
        sessions: Map<string, Session>;
        getReadyClient(): Client;
      };
    };
  }
}

export interface ILastTrack {
  trackName: string;
  artistName: string;
}

export type PlatformApi = {
  readonly apiEndpoint?: string;
  readonly refreshInterval: number;
  apiCredentials?: any;
  client?: Client;
  previousStatus: string | null | undefined;
  interval?: number;

  start(): Promise<void> | void;
  stop(): Promise<void> | void;

  updateStatus(): Promise<void> | void;
  fetchCurrentListening(): Promise<ILastTrack | null>;
};

export { Client };
