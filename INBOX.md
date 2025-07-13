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
- setup domain
