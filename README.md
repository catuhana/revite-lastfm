# Revite Last.fm

Bring your Last.fm (or any other platform soon :tm:) listening status to Revolt!

## Known Bugs and Limitations

1. If you're listening to a music and suddenly close Revolt client, music status
   will stay unless its cleared manually. This will be fixed soon :tm:.
2. Please do tell me if you find anything else.
3. meow

## Requirements

1. Up to date browser
2. Any client that uses [Revite](https://github.com/revoltchat/revite)
3. [Deno](https://deno.land) for bundling the plugin

## Building the Plugin

1. Clone this repository locally
2. Enter to cloned directory
3. Run `deno task bundle`
   - To have your username and api-key included, `--lastfm-username` and
     `--lastfm-apikey` can be used. Bundle plugin will log warnings if they're
     not entered.

## Using the Plugin

`deno task bundle` command describes how you can install and use the plugin.
