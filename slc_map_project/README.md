# SLC Strike Businesses Map

Interactive map showing Salt Lake City businesses participating in the January 30 General Strike.

## Prerequisites

- A **Mapbox access token** (free tier available at [mapbox.com/account/access-tokens](https://account.mapbox.com/access-tokens/))
- A local web server (the map loads `slc_strike_businesses.json` via fetch, which requires serving over HTTP)

## Running the App

From this directory (`slc_map_project/`), start a local server:

```bash
# Option A: Node.js
npx serve .

# Option B: Python 3
python -m http.server
```

Then open in your browser:
- **npx serve**: http://localhost:3000
- **Python**: http://localhost:8000

Paste your Mapbox access token into the prompt and click **Load Map**.

## Map Legend

Pins are color-coded by strike action:

| Color  | Action                  |
|--------|-------------------------|
| Red    | Closed all day          |
| Orange | Closing early           |
| Yellow | Partial closure         |
| Green  | Open as community space |
| Blue   | Open with donations     |
| Purple | Donating                |

Click any pin to see business details, strike day hours, and donation info.
