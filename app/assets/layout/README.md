# Layout

Do not edit files in this folder. They are generated.

## Where to update

Edit `modules/layout/config.js`, then run:

```bash
yarn build:layout
```

This also runs on `nuxt build`.

### Config options

- **`gridColor`** — colour of the developer grid lines
- **`containerMode`** — default `BlockContainer` mode (`contain`, `fluid`, or `fluid-infinite`)
- **`columnsGapX`** — space between columns, left to right
- **`columnsGapY`** — space between columns, top to bottom
- **`containerGutter`** — padding on the left and right of the container
- **`breakpoints`** — the layout at each screen size

### Breakpoint options

- **`name.primary`** — the screen name (`sm`, `md`, `lg`, …)
- **`name.secondary`** — the group name (`mobile`, `tablet`, `desktop`). Later breakpoints keep this until you set a new one
- **`contentWidth`** — how wide the content is at this screen. Leave it off the first breakpoint to stay fluid at small sizes. The largest content width is the design max (gaps and gutter freeze here). To grow past that on a page, use `BlockContainer` with `mode="fluid-infinite"` (or set `containerMode` in config)
- **`columns`** — how many columns to show
- **`columnsGapX`**, **`columnsGapY`**, **`containerGutter`** — optional. Override the values above for this screen only

Use a string with a unit (`'10px'`, `'0.5vw'`). `contentWidth` must be `px`.

## What this writes

- `css/media-queries.css`
- `css/block.css`
- `config.json` — runtime layout data (breakpoints, screens, image screens, and related options). Image screens are named breakpoint mins plus content widths and 2× those widths (for Vercel / retina).
