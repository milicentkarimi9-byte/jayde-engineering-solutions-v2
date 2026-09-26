# Jayde Engineering Solutions Ltd — website

Five-page static site. No build step, no framework, nothing to install.
Two sides of the business on one site: smart locks, CCTV and gate automation,
and separately two furnished short-stay apartments in Westlands.

## Files

| Path | What it is |
|---|---|
| `index.html` | Home |
| `smart-locks.html` | Smart lock sales, fitting, repairs, Tuya setup |
| `rentals.html` | Our stays |
| `about.html` | About us |
| `contact.html` | Contact / get a quote |
| `styles.css` | Every page's styling, one file |
| `app.js` | Menu, carousels, videos, the enquiry form |
| `assets/` | Logo, product photos, videos and posters |
| `assets/stay/` | Photos of the stays, cropped to 4:3 and web-sized |

Keep all of it together. The pages load the CSS, JS and assets by relative path.

## Publishing on GitHub Pages

1. Push everything to the repo root, keeping the `assets` folder as a folder.
2. Repository **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. Live at `https://<username>.github.io/<repo>/` in a minute or two.

## Colours

The 60 / 30 / 10 rule, defined once at the top of `styles.css`:

| Role | Name | Hex | Used for |
|---|---|---|---|
| 60% | Warm cream | `#FBF7EF` (deeper bands `#F3EADA`) | Page backgrounds |
| 30% | Midnight blue | `#0E1B33` (lighter `#1B2E52`) | Header, footer, dark bands, all text |
| 10a% | Marigold | `#E9A526` (text `#8A660A`) | Every call to action |
| 10b% | Logo blue | `#1A8FB4` (text `#06657F`, on dark `#7FD2EA`) | Icons, links, small details |

The accent is split in two so each has one job. Marigold means "press this";
blue is decoration and wayfinding. That keeps the buttons unmistakable instead
of competing with every coloured thing on the page.

The blue is taken from the logo itself — sampling it gives `#006C90` as its
accent colour — rather than picked to match.

Contrast on cream, measured:

| Token | Ratio | Safe for |
|---|---|---|
| `--midnight` | 16.1:1 | anything |
| `--blue-ink` | 6.2:1 | body text |
| `--gold-ink` | 4.9:1 | body text |
| `--blue` | 3.5:1 | icons and large text only |
| `--gold` | 2.0:1 | fills only, never text |

So marigold and blue both have a darker variant for text. Use `--gold` and
`--blue` as fills, `--gold-ink` and `--blue-ink` as lettering.

Change a colour once in `:root` and it changes on all five pages.

## Header and footer

Identical on every page. If you edit one, edit all five, and keep them the same —
a nav that differs between pages is the fastest way to look unfinished.
The current page is marked with `class="here"` on its own nav link.

## Things to change

- **Phone** — `assets`-free places: the top of `app.js`, plus `tel:` and `wa.me`
  links in each page's footer and on the contact page.
- **Email** — currently a personal Gmail. Swap it when a business address exists.
- **Prices** — on `smart-locks.html` in the cards, and in the `products` list
  near the top of `app.js` which feeds the home page carousel. Change both.
- **Facebook** — currently a `/share/` link. Swap for the page's own URL.
- **`ENDPOINT`** in `app.js` — paste a Formspree or Web3Forms URL and every
  enquiry is emailed as well as opening WhatsApp. Empty means WhatsApp only.

## Placeholders still to replace

- **`rentals.html`** — real photos are in. Still to confirm: whether the Mara
  room is its own unit or a second bedroom, the nightly rates (currently left
  off deliberately), and whether Wi-Fi speed can be described as fast.

Working notes are HTML comments inside the pages, not visible text. Search the
files for `NOTE:` to find what still needs an answer.
- **`about.html`** — the story is written for the demo. Replace it with
  Japheth's own: when he started, what he did before, roughly how many doors,
  and why he added the stays.

## Still missing

No CCTV footage. Locks and gates both appear on film; CCTV is text only.

## How the enquiry form works

No server. It writes the answers into a message and opens WhatsApp with it
ready to send — the visitor presses send. Setting `ENDPOINT` adds an emailed copy.
