export interface ILastTrack {
  trackName: string;
  artistName: string;
}

export type PlatformApi = {
  readonly apiEndpoint?: string;
  readonly refreshInterval: number;
  apiCredentials?: any;
  client?: RevoltClient;
  previousStatus: string | null | undefined;
  interval?: number;

  start(): Promise<void> | void;
  stop(): Promise<void> | void;

  getStatus(): Promise<void> | void;
  setStatus(status: PlatformApi["previousStatus"]): Promise<void> | void;
  updateStatus(): Promise<void> | void;

  fetchCurrentListening(): Promise<ILastTrack | null>;
};
