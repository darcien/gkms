# Inbox

## data

- cleanup data pipeline, script is very confusing
  - fetch and parse could be merged, but still allow recover from bad parse without refetch
- maybe put json into dedicated dir
- make fetch configurable, only pull delta by default
- merge delta properly
- consider extracting key from code
- guest color maybe should be in website instead of data
- parse next guest from episode description

## website - design

- need better website name
- need logo and favicon
- design system is a mess
  - use game or mashiro color scheme?
- need to figure out what font to use
- what about guest icon?
- for report card, text size in small display is too big


## website - content

- setup i18n
  - right now en and ja is mixed
- report card still need more stats
  - what data for the triangle graph? tsukkomi - boke - neutral?
  - song played freq maybe? per total songs
  - each radio section count? requires manual counting or do audio transcribing
  - audio transcribing unlocks lots of stats like kawachi goroku
  - pie chart for guest maybe
  - bar chart for non-cast guests
  - most common combination
  - most uncommon combination (non-cast excluded)

## website - raw idea

- next guest predictor?
  - this is hard to implement, esp. factoring combination
- graph with each guest as node
  - edge is the guest appearance
  - size is the number of appearances
  - edge connector is the number of times they appeared together


## ops

- setup deployment
  - gh pages is done, but root page has extra slash
  - plus with the sveltekit static assets thing,
    maybe need to look into different host.
    Right now need to rebuild for different domain.
- setup domain
- restructure the repo
  - zed still missing lots of monorepo configs
  - deno LSP also runs in web dir,
    doesn't seem like there's easy way to disable it for specific path,
    but can "enable" it on specific path instead
- setup enhanced img - https://svelte.dev/docs/kit/images#sveltejs-enhanced-img
