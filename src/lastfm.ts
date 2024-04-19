import { logger } from "./logger.ts";
import { PlatformApi } from "./types.ts";

export class LastFM implements PlatformApi {
  readonly apiEndpoint = "https://ws.audioscrobbler.com/2.0/";
  readonly refreshInterval = 12000;
  apiCredentials: { username: string; apiKey: string };
  client: RevoltClient;
  previousStatus: string | null | undefined;
  interval?: number;

  constructor(
    constructor: {
      client: RevoltClient;
      apiCredentials: LastFM["apiCredentials"];
    },
  ) {
    this.client = constructor.client;
    this.apiCredentials = constructor.apiCredentials;

    this.previousStatus = this.client.user!.status!.text;
  }

  async start() {
    await this.updateStatus();
    this.interval = setInterval(
      async () => await this.updateStatus(),
      this.refreshInterval,
    );
  }

  async stop() {
    clearInterval(this.interval);
    await this.setStatus(this.previousStatus);
  }

  async getStatus() {
    const userInfo = await this.client.api.get("/users/@me");
    userInfo.status?.text;
  }

  async setStatus(status: LastFM["previousStatus"]) {
    await this.client.api.patch("/users/@me", {
      status: {
        text: status,
      },
    });
  }

  async updateStatus() {
    const currentListening = await this.fetchCurrentListening();
    if (!currentListening) {
      await this.setStatus(this.previousStatus);
      return;
    }

    const statusText =
      `🎵 Listening to ${currentListening?.trackName} by ${currentListening?.artistName}`;

    if (this.client.user!.status!.text === statusText) {
      return;
    }

    await this.setStatus(statusText);
  }

  async fetchCurrentListening() {
    const fetchParams = new URLSearchParams({
      method: "user.getRecentTracks",
      format: "json",
      limit: "1",
      user: this.apiCredentials.username,
      api_key: this.apiCredentials.apiKey,
    });

    const response = await fetch(`${this.apiEndpoint}?${fetchParams}`);
    if (!response.ok) {
      logger("An error occurred when fetching last listens.", {
        status: response.status,
        message: (await response.json()).message,
      });

      return null;
    }

    const responseJson = await response.json();
    if (responseJson.error) {
      logger("Last.fm API returned an error.", {
        error: responseJson.error,
        message: responseJson.message,
      });

      return null;
    }

    const trackData = responseJson.recenttracks?.track[0];
    if (!trackData?.["@attr"]?.nowplaying) {
      return null;
    }

    return {
      trackName: trackData.name,
      artistName: trackData.artist["#text"],
    };
  }
}
