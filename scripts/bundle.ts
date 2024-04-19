#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write

import { parseArgs } from "@std/cli";
import { bundle } from "emit";

import manifest from "../manifest.json" with { type: "json" };

const args = parseArgs(Deno.args, {
  string: ["lastfm-username", "lastfm-api-key"],
});

const pluginEntry = new URL("../src/index.ts", import.meta.url);
let bundledCode = (await bundle(pluginEntry)).code;

if (args["lastfm-username"]) {
  bundledCode = bundledCode.replace(".{{USERNAME}}.", args["lastfm-username"]);
} else {
  console.warn(
    "%cNo LastFM username provided. Plugin WONT work properly. To add it, please use the `--lastfm-username` flag.",
    "color: red",
  );
}

if (args["lastfm-api-key"]) {
  bundledCode = bundledCode.replace(".{{API_KEY}}.", args["lastfm-api-key"]);
} else {
  console.warn(
    "%cNo LastFM API key provided. Plugin WONT work properly. To add it, please use the `--lastfm-api-key` flag.",
    "color: red",
  );
}

manifest.entrypoint = bundledCode;

await Deno.mkdir("./dist", { recursive: true });
await Deno.writeTextFile("./dist/plugin.json", JSON.stringify(manifest), {
  create: true,
});

console.log(
  `
%cCode is bundled into \`./dist/plugin.json\` file!%c
To load the plugin:
  1. Copy the contents of \`plugin.json\` file
  2. Open Revite client
  3. Open developer tools and select \`Console\`
  4. Write \`state.plugins.add()\` and paste the code inside braces.`,
  "color: limegreen",
  "color: inherit",
);
