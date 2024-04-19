#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write

import { bundle } from "emit";
import manifest from "../manifest.json" with { type: "json" };

const pluginEntry = new URL("../src/index.ts", import.meta.url);
const bundledEntry = await bundle(pluginEntry);

manifest.entrypoint = bundledEntry.code;

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
