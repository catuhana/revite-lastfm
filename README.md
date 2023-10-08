# Revite Last.fm

Bring your Last.fm (or any other platform) listening status to Revolt!

## Known Bugs and Limitations

1. While listening music, closing the Web App will make your status stay as listening to the music you were listening before closing Revolt Web. This is limitation a of the Revolt API, since statuses are permanent, so I don't think this can be fixed.
2. Please do tell me if you find anything else.
3. meow

## Requirements

1. Up to date browser
2. Any client that uses [Revite](https://github.com/revoltchat/revite)
3. [Deno](https://deno.land) for building

## Building the Plugin

1. Clone this repository locally
2. Change directory to the plugin
3. [Update these lines according to your data](index.ts#L5-L6)
   - To get a Last.fm API key, https://www.last.fm/api/account/create
4. Run `deno task bundle`

## Using the Plugin

`deno task bundle` command describes how you can install and use the plugin.
