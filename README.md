# ICS432---Assignment-2
ICS432 - Assignment 2 Github Repository [Team 5 ]

## Run the EcoCharge prototype

Extract the project folder and open `index.html` in a browser. Keep `style.css`,
`fleet.js`, `calculator.js`, and the `images` folder beside it. The prototype
works offline and does not need installation or a server.

The supplied `index.html` is unchanged. Its existing stylesheet and script tags
load the added files. The original headings, fleet table, charging form, result
paragraph, footer, and comments are retained.

### Added functionality

- `fleet.js` populates the original table with ten EVs, photos, static battery
  levels, and statuses. It also populates the original vehicle dropdown.
- `style.css` styles the existing page, table, and form. On small screens the
  fleet table can be scrolled horizontally.
- `calculator.js` connects the original form to the assignment's fixed formula:
  **Cost = hours × 7.5 kW × $0.15 per kWh**. Results are displayed in USD.
- `tests/calculator.test.js` contains eight unit tests for the calculation.
- `ADDITIONS.md` records the preservation check and GitHub upload steps.

Vehicle battery levels and statuses are fictional demonstration values. Expand
**Vehicle photo credits** under the table for photographer and licence links.

### Run the calculation tests

With Node.js installed, run this from the project folder:

```bash
node --test tests/calculator.test.js
```

Tests cover positive and fractional hours, numeric form input, zero hours,
negative durations, non-numeric input, blank/unsupported values, and overflow.

### Code review note

Blank input must not become a free charging session through `Number("")`.
The function rejects blank strings before conversion. It also rejects negative
and non-finite values. The page handles validation errors and clears an old
estimate when the input changes. Vehicle names and results use `textContent`
to avoid treating data as HTML.
